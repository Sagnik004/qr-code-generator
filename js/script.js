const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');
const url = document.getElementById('url');
const size = document.getElementById('size');
const generatedQRBlock = document.getElementById('generated');
const spinner = document.getElementById('spinner');

const handleGenerateQrSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const enteredUrl = url.value;
  const selectedSize = size.value;
  if (enteredUrl === '') {
    alert('Please enter an URL to generate the QR code!');
    return;
  }

  showSpinner();

  setTimeout(() => {
    hideSpinner();
    generateQRCode(enteredUrl, selectedSize);

    setTimeout(() => {
      const saveUrl = qr.querySelector('img').src;
      createSaveBtn(saveUrl);
    }, 50);
  }, 1000);
};

const generateQRCode = (url, size) => {
  const qrcode = new QRCode(qr, {
    text: url,
    width: size,
    height: size,
  });
};

const showSpinner = () => {
  spinner.style.display = 'block';
};

const hideSpinner = () => {
  spinner.style.display = 'none';
};

const clearUI = () => {
  qr.innerHTML = ''; // clearPrevQR
  const saveLink = document.getElementById('save-link');
  if (saveLink) {
    saveLink.remove();
  }
};

const createSaveBtn = (saveUrl) => {
  const link = document.createElement('a');
  link.id = 'save-link';
  link.classList =
    'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.href = saveUrl;
  link.download = 'qrcode';
  link.innerHTML = 'Save Image';

  generatedQRBlock.appendChild(link);
};

form.addEventListener('submit', handleGenerateQrSubmit);

hideSpinner();
