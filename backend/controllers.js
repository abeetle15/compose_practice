import Message from "./model.js";

export async function getLatestMessage(req, res) {
  try {
    const latestMessage = await Message.findOne().sort({ createdAt: -1 });
    if (!latestMessage) {
      return res
        .status(404)
        .json({ message: "Send your first message and reload the page" });
    }
    res.status(200).json({ message: latestMessage.message });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export async function postMessage(req, res) {
  const message = req.body.message;

  if (!message || !message.length) {
    return res.status(400).json({ message: "Message required" });
  }
  try {
    const newMessage = await Message.create({ message: message });
    res.status(201).json({
      message: "Message successfully posted",
      response: newMessage,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
