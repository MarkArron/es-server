const socket = (io) =>
  io.on("connection", (stream) => {
    console.log(`connection established by: ${stream.id}`);

    stream.on("join_room", (room) => {
      stream.join(room);
      // console.log(room);
    });

    stream.on("send_attendance", (data) => {
      stream.to(data.appointment?.schedule).emit("recieve_attendance", data);
      // console.log(data.appointment?.schedule);
    });

    stream.on("start_exam", (data) => {
      stream.to(data._schedule?._id).emit("start_exam", data);
      console.log(data);
    });
  });

module.exports = socket;
