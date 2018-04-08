const azure = require('azure-storage');
const blobService = azure.createBlobService(process.env.AZURE_STORAGE_ACCOUNT_NAME, process.env.AZURE_STORAGE_KEY);
const azureContainerName = 'groundout';

exports.createContainer = () => {
  return new Promise((resolve, reject) => {
    blobService.createContainerIfNotExists(azureContainerName, (error, result, response) => {
      if (error) return reject(error);

      return resolve(result);
    });
  });
}

exports.uploadLocalFile = (fileName, dir) => {
  return new Promise((resolve, reject) => {
    blobService.createBlockBlobFromLocalFile(azureContainerName, fileName, dir, (error, result) => {
      if (error) return reject(error);

      return resolve(result);
    })
  });
}

exports.deleteFile = (fileName) => {
  return new Promise((resolve, reject) => {
    blobService.deleteBlobIfExists(azureContainerName, fileName, (error) => {
      if (error) return reject(error);
      return resolve();
    });
  });
}
