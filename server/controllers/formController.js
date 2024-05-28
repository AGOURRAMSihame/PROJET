const Form = require('../models/form');

exports.saveFormData = async (req, res) => {
    const formData = req.body;

    try {
        const savedForm = await Form.create(formData);
        res.status(201).json(savedForm);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de l\'enregistrement du formulaire.' });
    }
};
exports.getAllForms = async (req, res) => {
    try {
        const forms = await Form.find();
        res.json(forms);
        
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des formulaires.' });
    }
};

exports.getFormById = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) {
            return res.status(404).json({ message: 'Formulaire non trouvé.' });
        }
        res.json(form);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du formulaire.' });
    }
};

exports.updateForm = async (req, res) => {
    try {
        const { inputs } = req.body;
        const updatedForm = await Form.findByIdAndUpdate(req.params.id, { inputs }, { new: true });
        res.json(updatedForm);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du formulaire.' });
    }
};

exports.deleteForm = async (req, res) => {
    try {
        await Form.findByIdAndDelete(req.params.id);
        res.json({ message: 'Formulaire supprimé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du formulaire.' });
    }
};