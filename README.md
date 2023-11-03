# WhatsApp Sticker Bot
Um bot para WhatsApp especializado na criação de stickers.

### Comandos
**/sticker**<br />
Envie uma imagem junto com o comando /sticker para transformá-la instantaneamente em um sticker.<br />
```/sticker```<br />
<img src='https://github.com/LhuizF/whatsapp-sticker-bot/assets/80434677/689abd4e-6b6c-4c1e-b4ad-8a55a5d63c31' width='300px'  />

Você também pode enviar o link de uma imagem e o bot criará um sticker a partir dela.<br />
```/sticker https://...```<br />
<img src='https://github.com/LhuizF/whatsapp-sticker-bot/assets/80434677/2ae97ab3-31a9-45f8-aad2-2f301cb6bd2e' width='300px'  />

**/7tv**<br />
Busque emotes da 7tv pelo nome. Se não encontrar o emote desejado na primeira busca, utilize o comando /7tv seguido do nome do emote e o número da página desejada.<br />
```/7tv {nome do emote} {número da página} (padrão: 1)```<br />
<div>
  <img src='https://github.com/LhuizF/whatsapp-sticker-bot/assets/80434677/1e08f38c-fb85-4a83-acfd-3ffa234bfbd2' width='300px'  />
  <img src='https://github.com/LhuizF/whatsapp-sticker-bot/assets/80434677/4009dadd-e5d9-45fe-9c33-2d3c86dce315' width='300px'  />
</div>

**/7tvid** <br />
Busque um emote da 7tv pelo seu ID. <br />
```/7tvid {id do emote do 7tv}```<br />
<img src='https://github.com/LhuizF/whatsapp-sticker-bot/assets/80434677/5388044a-f233-472b-9eae-d6d00afa79e8' width='300px'  />


### Como Executar
Certifique-se de ter o Node.js instalado e execute o bot usando o seguinte comando:

```
npm run start
```

### Tecnologias Utilizadas
- [whatsapp-web.js](https://wwebjs.dev)
- [7tv api](https://github.com/SevenTV/API)

### Importante

Para converter um emote animado da 7tv em um sticker também animado, certifique-se de ter o ffmpeg instalado em sua máquina. Saiba mais sobre isso [aqui](https://github.com/pedroslopez/whatsapp-web.js/pull/479#issuecomment-748389827).
