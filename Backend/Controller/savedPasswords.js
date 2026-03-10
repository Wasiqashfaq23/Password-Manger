const { default: mongoose } = require("mongoose");
const { Password } = require("../Model/savedPasswords");

async function createFields(req, res) {
    const { service, email, password } = req.body;
    const available = await Password.findOne({
        service,
        email,
        password,
    })
    if(available){return res.json ("Already presnent in the Database")}
    if (!email || !password || !service) { return res.json("All fields are required") }
    await Password.create({
        email: email,
        service: service,
        password: password,
        createdBy: req.user._id
    })
    return res.json("Saved Password Success")
}

async function renderPasswords(req, res) {
    const allpasswords = await Password.find({ createdBy: req.user._id })
    if (allpasswords.length === 0) {
        return res.json({ message: "No passwords found" })
    }
    if (!allpasswords) { res.json("No passwords found") }
    return res.json({ passwords: allpasswords })
}

async function deleteField(req, res) {
    const id = req.params.id;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) { return res.status(400).json({ message: "Give a valid Id" }) };
    const creator = req.user._id
    const del = await Password.findOneAndDelete({
        _id: id,
        createdBy: creator,
    })
    if (!del) return res.json({ message: "Password not found" });
    console.log(del)
    return res.json("delete Success")
}

async function updateField(req, res) {
    const id = req.params.id
    const { service, email, password } = req.body
    if (!id) {
        return res.json({ message: "ID is required" })
    }
    try {

        // updating the field
        const updated = await Password.findByIdAndUpdate(
            id,
            {
                service,
                email,
                password
            },
            { new: true }
        )
        res.json({
            message: "Password updated successfully",
            updated
        })
    } catch (error) {
        res.json(error)
    }
}

module.exports = { renderPasswords, createFields, deleteField, updateField }