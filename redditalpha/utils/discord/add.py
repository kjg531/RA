import discord
import asyncio

client = discord.Client()

@client.event
@asyncio.coroutine
def on_member_join(member):
    server = member.server
    fmt = 'Welcome {0.mention} to {1.name}!'
    # await client.send_message(server, fmt.format(member, server))
    yield from client.send_message(server, fmt.format(member, server))

@client.event
@asyncio.coroutine
def on_ready():
    print('Logged in as')
    print(client.user.name)
    print(client.user.id)
    print('------')
    print(client.servers)
    for server in client.servers:
        print(server.name)
        if server.id == '220705259947819009':
            print('----this is ehi')
            for member in server.members:
                print(member.nick)

client.run('mando.alvarado.jose@gmail.com', 'Matytam12')
