import fetch from 'isomorphic-fetch';

const config = {
  name: "fuck",
  cooldown: 500,
  permissions: [0,1,2],
  credits: "XaviaTeam",
  nsfw: true
}
const onCall = ({ message }) => {
  fetch("https://purrbot.site/api/img/nsfw/fuck/gif")
    .then(response => response.json())
    .then(data => {
      if (data.link) {
        const streamUrl = data.link;
        global.getStream(streamUrl)
          .then(stream => message.reply({ attachment: stream }).catch(e => console.log(e)))
          .catch(e => console.log(e));
      } else {
        message.reply("Không tìm thấy ảnh");
      }
    })
    .catch(e => console.log(e));
};
export {
  config,
  onCall
}