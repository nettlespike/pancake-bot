module.exports ={
    name: "hello",
    description: "saying hello",
    execute(message){
        message.channel.send("Hello there "+ message.member.displayName);
    }
}