import fetchTIHAttractionData from '../services/fetchTIHAPI.js';
import TIHData from '../models/models.TIH.js';

export const getTIHData = async (req, res) => {
    try {
        // execute fetchTIHdata function, start with attraction
        const TIHData = await fetchTIHAttractionData(
            'content/common/v2/search?dataset=attractions'
        );
        console.log('TIHData ==> ', TIHData);
        res.status(200).json({
            success: 'true',
            data: TIHData,
        });
    } catch (err) {
        console.error('error fetching TIH data: ', err);
    }
};
