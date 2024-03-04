import { z } from 'zod';
import type { OpenAI } from 'openai';
import { zodToJsonSchema } from 'zod-to-json-schema';
import type { NextResponse } from 'next/server';
import { usedOpenAI } from '@/app/utils';

const designInit = async (
  prompt: string,
  res: NextResponse,
  SyncEvents: any,
  writer: any,
  encoder: any,
) => {
  const components = (await import('@/template/taroify/metadata.json')).default;
  const functionSchema = z.object({
    new_component_description: z
      .string()
      .describe(
        `Write a description for Taro component design task based on the user query. Stick strictly to what the user wants in their request - do not go off track`,
      ),
    use_library_components: z.array(
      z.object({
        library_component_name: z.enum(
          components.map((i) => i.name) as [string],
        ),
        library_component_usage_reason: z.string(),
      }),
    ),
  });
  const context: OpenAI.ChatCompletionMessageParam[] = [
    {
      role: `system`,
      content:
        `Your task is to design a new Taro component for a mini app, according to the user's request.\n` +
        `If you judge it is relevant to do so, you can specify pre-made library components to use in the task.\n` +
        `You can also specify the use of icons if you see that the user's request requires it.`,
    },
    {
      role: `user`,
      content: `Multiple library components can be used while creating a new component in order to help you do a better design job, faster.\n\nAVAILABLE LIBRARY COMPONENTS:\n\`\`\`\n${components
        .map((e) => {
          return `${e.name} : ${e.description};`;
        })
        .join('\n')}\n\`\`\``,
    },
    {
      role: `user`,
      content:
        `USER QUERY : \n\`\`\`\n${prompt}\n\`\`\`\n\n` +
        `Design the new Taro component task for the user as the creative genius you are`,
    },
  ];
  const response = await usedOpenAI('').chat.completions.create({
    model: 'gpt-3.5-turbo-1106', // 'gpt-4-1106-preview',
    messages: context,
    tools: [
      {
        type: 'function',
        function: {
          name: `design_new_component_api`,
          description: `generate the required design details to create a new component`,
          parameters: zodToJsonSchema(functionSchema),
        },
      },
    ],
    stream: true,
  });
  let completion = '';
  for await (const part of response) {
    const chunk =
      part.choices[0]?.delta?.tool_calls?.[0]?.function?.arguments || '';
    completion += chunk;
    SyncEvents.writeMessage(writer, encoder, {
      data: chunk,
    });
  }
  try {
    const parsed = JSON.parse(completion) as z.infer<typeof functionSchema>;

    if (parsed) {
      const componentDesignTask = {
        description: {
          user: prompt,
          llm: parsed.new_component_description,
        },
        components: parsed.use_library_components?.map((i) => ({
          name: i.library_component_name,
          usage: i.library_component_usage_reason,
        })),
      };
    }
  } catch (err) {
    throw new Error('OpenAI doesnt return expected data');
  }
};

export default designInit;
