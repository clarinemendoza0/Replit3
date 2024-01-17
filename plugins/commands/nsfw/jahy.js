import fetch from 'isomorphic-fetch';

const config = {
  name: "jahy",
  cooldown: 500,
  permissions: [0,1,2],
  credits: "XaviaTeam",
  nsfw: true
}
const onCall = ({ message }) => {
  fetch("https://www.nguyenmanh.name.vn/api/nsfw/jahy?apikey=JonJRTtP")
    .then(response => response.json())
    .then(data => {
      if (data.url) {
        const streamUrl = data.url;
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