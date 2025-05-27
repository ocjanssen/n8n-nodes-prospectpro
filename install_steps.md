# Installation Steps

1. **Install n8n globally**
   ```bash
   pnpm add -g n8n
   ```

2. **Start n8n**
   ```bash
   pnpm exec n8n start
   ```

3. **Create custom directory**
   ```bash
   mkdir ~/.n8n/custom
   ```

4. **Initialize in custom directory**
   ```bash
   pnpm init
   ```

5. **Edit the package.json** to include the following:
   ```json
   {
     "dependencies": {
       "n8n-nodes-bedrijfsdata": "file:{CUSTOM_NODE_DIR}"
     }
   }
   ```

6. **In CUSTOM_NODE_DIR** do:
   ```bash
   pnpm i, pnpm build
   ```

7. **In CUSTOM_NODE_DIR** do:
   ```bash
   pnpm link
   ```

8. **In ~/.n8n/custom** do:
   ```bash
   pnpm install .
   ```

9. **Start n8n**
   ```bash
   pnpm exec n8n start
   ```