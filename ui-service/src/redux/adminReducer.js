import { USER_LOGGED_IN, PRE_EVAL_SCORE, POST_EVAL_SCORE } from "./constants";

const initialState = {
    userRecords: []
}


export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            const updatedUserRecords = [...state.userRecords, action.payload];
            return { ...state, userRecords: updatedUserRecords }
        case PRE_EVAL_SCORE:
            const preEvalScoreData = action.payload;
            let userToUpdatePreScore = state.userRecords.find(update => update.id === preEvalScoreData.userId);
            const recordsOnExcludingUserToPreEvalUpdate = state.userRecords.filter(update => update.id !== preEvalScoreData.userId)
            userToUpdatePreScore = {
                ...userToUpdatePreScore,
                "preEvalStatus": "Completed",
                "preEvalScore": preEvalScoreData.preEvalScore
            }
            const userRecordsAfterPreEvalScoreUpdate = [...recordsOnExcludingUserToPreEvalUpdate, userToUpdatePreScore];
            return { ...state, userRecords: userRecordsAfterPreEvalScoreUpdate }
            case POST_EVAL_SCORE:
                debugger;
                const postEvalScoreData = action.payload;
                let userToUpdatePostScore = state.userRecords.find(update => update.id === postEvalScoreData.userId);
                const recordsOnExcludingUserToPostEvalUpdate = state.userRecords.filter(update => update.id !== postEvalScoreData.userId)
                userToUpdatePostScore = {
                    ...userToUpdatePostScore,
                    "postEvalStatus": "Completed",
                    "postEvalScore": postEvalScoreData.postEvalScore
                }
                const userRecordsAfterPostEvalScoreUpdate = [...recordsOnExcludingUserToPostEvalUpdate, userToUpdatePostScore];
                return { ...state, userRecords: userRecordsAfterPostEvalScoreUpdate }
    
            default:
            return state;
    }
}