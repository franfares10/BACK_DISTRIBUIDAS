var cloudinary = require("cloudinary").v2;

_this = this;

cloudinary.config({
  cloud_name: "apisbackfranivan",
  api_key: "291692491198663",
  api_secret: "YMATgrzrFGfPtKihy_HY0Dxa4ms",
});
CLOUDINARY_URL =
  "cloudinary://291692491198663:YMATgrzrFGfPtKihy_HY0Dxa4ms@apisbackfranivan";

//Configuracion hecha, deberiamos desarrollar los Use Cases.


const subirDocumentosDigitales = async (req, res) => {
  const { base64 } = req.body;
  try {
    var resultado = await cloudinary.uploader.upload(
      base64,
      { public_id: Date.now() }
    );
    console.log("Res cloudinary: " + resultado.secure_url)
    res.status(200).json({
      url: resultado.secure_url
    })
  } catch (e) {
    console.log("Error", e);
    res.status(500).json({
      errorOcurred: e,
      method: 'subirDocumentosDigitales'
  })
  }
};


module.exports = {
  subirDocumentosDigitales,
};
