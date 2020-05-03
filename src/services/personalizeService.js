const aws = require("aws-sdk");

const pers = new aws.PersonalizeRuntime({
    accessKeyId: 'AKIAJLSSSCG7W7PCINIQ',
    secretAccessKey: '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',
    region: 'us-east-2',
});

const params = {
    campaignArn: 'arn:aws:personalize:us-east-2:504754404119:campaign/igrek_Msk',
    numResults: 100,
};

const getRecomendations = async (userId) => { 
	 try {
      const result = await pers.getRecommendations({...params, userId}).promise();
      return result.itemList.map(({ itemId }) => itemId);
    } catch (error) {
    	return 'PersonalizeError';
      // throw new ServiceError('INVALID_PREFERENCE');
    }
}

module.exports = { 
    getRecomendations,
 }