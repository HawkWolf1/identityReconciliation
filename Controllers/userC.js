const Contact = require('../Models/userTable')
const Response = require('../Models/responseTable')



const userD = async (req, res, next) => {
  try {
    const { email, phone } = req.body;

    if (!email && !phone) {
      return res.status(400).json({ error: "Bad parameters. Email or phone number is required." });
    }

    let existingContact;
    let existingResponse;
    let linkedId;

    existingContact = await Contact.findOne({ $or: [{ email }, { phoneNumber: phone }] });
    existingResponse = await Response.findOne({ $or: [{ email }, { phoneNumber: phone }] });

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

    if (existingResponse) {
      linkedId = existingResponse._id;
      if (!existingResponse.email.includes(email)) {
        existingResponse.email.push(email);
      }
      if (!existingResponse.phoneNumber.includes(phone)) {
        existingResponse.phoneNumber.push(phone);
      }
      if (existingResponse.email.includes(email) && existingResponse.phoneNumber.includes(phone)) {
                existingResponse.__v += 1;
              }
      try {
        await existingResponse.save();
        res.status(200).json({ message: 'New Contact created successfully!', contact: existingResponse });
      } catch (error) {
        res.status(500).json({ error: 'Failed to save the contact.', details: error.message });
      }
    } else {
      const newResponse = new Response({
        email: [email],
        phoneNumber: [phone],
        linkedId: newContact._id,
        linkPrecedence: 'primary',
      });
      try {
        await newResponse.save();
        res.status(200).json({ message: 'New Contact created successfully!', contact: newResponse });
      } catch (error) {
        res.status(500).json({ error: 'Failed to save the contact.', details: error.message });
      }
    }

  } catch (err) {
    res.status(500).json(err);
  }
};




module.exports = {
    userD
}