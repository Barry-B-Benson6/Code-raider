const sessions = new Map();

module.exports = {
    name: 'GetCreate',
    description: "confirm the correct code",
    getOrCreateSession(guildId) {
        if (!sessions.has(guildId)) {
            sessions.set(guildId, new SessionState(guildId));
            console.log('session created');
        }
        
    
        sessions.get(guildId).users = client.users;
    
        return sessions.get(guildId);
    }
}