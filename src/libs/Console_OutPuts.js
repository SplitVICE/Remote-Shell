module.exports = class console_outputs {
    constructor(IPv4, port) {
        this.IPv4 = IPv4
        this.port = port
    }
    init__output() {
        return `
-------------------------------------------------------------------------------------------------

██████  ███████ ███    ███  ██████  ████████ ███████     ███████ ██   ██ ███████ ██      ██ 
██   ██ ██      ████  ████ ██    ██    ██    ██          ██      ██   ██ ██      ██      ██ 
██████  █████   ██ ████ ██ ██    ██    ██    █████       ███████ ███████ █████   ██      ██ 
██   ██ ██      ██  ██  ██ ██    ██    ██    ██               ██ ██   ██ ██      ██      ██ 
██   ██ ███████ ██      ██  ██████     ██    ███████     ███████ ██   ██ ███████ ███████ ███████ 
--- By JUST VICE ---

Visit ${this.IPv4}:${this.port} on an Internet browser to use the web application.
-------------------------------------------------------------------------------------------------
        `;
    }

}