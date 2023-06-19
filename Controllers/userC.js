const Contact = require('../Models/userTable')


const userD = async (req, res, next) => {
    try {
      const { email, phone } = req.body;
  
      if (!email && !phone) {
        return res.status(400).json({ error: "Bad parameters. Email or phone number is required." });
      }
  
      let existingContact;
      let linkedId;
  
      existingContact = await Contact.findOne({ $or: [{ email }, { phoneNumber: phone }] });
  
      if (existingContact) {
        linkedId = existingContact._id;
      }
  
      const newContact = new Contact({
        email,
        phoneNumber: phone,
        linkedId,
        linkPrecedence: existingContact ? "secondary" : "primary"
      });
  
      await newContact.save();
  
      res.status(200).json({ message: 'New Contact created successfully!', contact: newContact });
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  


module.exports = {
    userD
}