class AIBlock {
    getInfo() {
        return {
            id: "AI",
            name: "AI",
            blocks: [
                {
                    opcode: "completePrompt",
                    blockType: "reporter",
                    text: "complete prompt [string]",
                    arguments: {
                        string: {
                            type: "string",
                            defaultValue: "Explain quantum computing in simple terms"
                        }
                    }
                }
            ],
            menus: {}
        };
    }

    async completePrompt({ string }) {
        const text = string.trim();

        const url = "http://localhost:11434/api/generate";

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "deepseek-v3.1:671b-cloud",   // ← zmień model jeśli chcesz
                prompt: text,
                stream: false
            })
        };

        console.log("REQUEST:", url);

        const response = await fetch(url, options);
        const jsonData = await response.json();

        return jsonData.response || "";
    }
}

// Register block with Scratch
Scratch.extensions.register(new AIBlock());
