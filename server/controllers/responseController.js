// controllers/responseController.js
const Response = require('../models/response');
const Form = require('../models/form');

exports.submitResponse = async (req, res) => {
    try {
      const { formId, formData, userEmail, userName } = req.body;
      console.log('Form ID:', formId);
      console.log('Form Data:', formData);
  
      if (!formId || !formData || !userEmail || !userName) {
        return res.status(400).json({ message: 'Données d\'entrée manquantes.' });
      }
  
      const form = await Form.findById(formId);
      if (!form) {
        return res.status(404).json({ message: 'Formulaire non trouvé.' });
      }
  
      const response = new Response({
        formId: formId,
        formData: formData,
        userEmail: userEmail,
        userName: userName
      });
  
      await response.save();
  
      return res.status(201).json({ message: 'Réponse enregistrée avec succès.' });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la réponse :', error);
      return res.status(500).json({ message: 'Erreur lors de l\'enregistrement de la réponse.' });
    }
  };

exports.getAllResponsesWithTitles = async (req, res) => {
  try {
    const responses = await Response.aggregate([
        {
            $lookup: {
                from: "forms",
                localField: "formId",
                foreignField: "_id",
                as: "form"
            }
        },
        {
            $unwind: "$form"
        },
        {
            $project: {
                _id: 1,
                "formTitle": "$form.title", 
                "formData": 1,
                "userEmail": 1,
                "userName": 1
            }
        }
    ]);
    res.json(responses);
} catch (error) {
    console.error('Erreur lors de la récupération des réponses avec les titres des formulaires :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des réponses avec les titres des formulaires.' });
}
};
// Fonction pour récupérer une réponse par ID
exports.getResponseById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Response.findById(id);
        if (!response) {
            return res.status(404).json({ message: 'Réponse non trouvée.' });
        }
        return res.status(200).json(response);
    } catch (error) {
        console.error('Erreur lors de la récupération de la réponse par ID :', error);
        return res.status(500).json({ message: 'Erreur lors de la récupération de la réponse par ID.' });
    }
};
