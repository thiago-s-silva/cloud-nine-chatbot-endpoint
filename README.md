# OpenAI Assistant
### Creating a new assistant
To create a new assistant you can use the infrastructure utility handler located at `infrastructure/openai/publish-openai-assistant.ts`. Make sure to call this handler with the create operation like `handler(OPERATION_ENUM.CREATE, null)`.

This handler will create a new assistant in the OpenAI Dashboard and will print the assistant ID to the console. Update the corresponding assistant ID for the related envs:
- DEV - `DEV_ASSISTANT_ID`

### Updating an existent assistant
To update an existent assistant you can use the infrastructure utility handler located at `infrastructure/openai/publish-openai-assistant.ts`. Make sure to call this handler with the create operation like `handler(OPERATION_ENUM.CREATE, "abc123")` passing the assistant ID as the second parameter. This utility handler will only update the assistant instructions for now.