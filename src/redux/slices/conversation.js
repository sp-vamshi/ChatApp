import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    direct_chat: {
        conversations: [],
        current_conversation: null,
        current_messages: []
    },
    group_chat: {

    }
}


export const slice = createSlice({
    name: "conversations",
    initialState,
    reducers: {
        onSignOut(state, action) {
            return initialState
        },
        fetchDirectConversations(state, action) {
            const list = action.payload.conversations.map((el) => {
                const this_user = el.participants.find((elm) => elm._id.toString() !== action.payload.user_id)
                return {
                    id: el._id,
                    user_id: this_user._id,
                    name: `${this_user.firstName} ${this_user.lastName}`,
                    online: this_user.status === "Online",
                    img: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg',
                    msg: "",
                    time: "9:36",
                    unread: 0,
                    pinned: false,
                }
            })
            state.direct_chat.conversations = list
        },
        updateDirectConversation(state, action) {
            const this_conversation = action.payload.conversation
            state.direct_chat.conversations = state.direct_chat.conversations.map((el) => {
                if (el.id !== this_conversation._id) {
                    return el
                } else {
                    const user = this_conversation.participants.find((elm) => elm._id.toString() !== action.payload.user_id)

                    return {
                        id: this_conversation._id,
                        user_id: user._id,
                        name: `${user.firstName} ${user.lastName}`,
                        online: user.status === "Online",
                        img: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
                        msg: "",
                        time: "9:36",
                        unread: 0,
                        pinned: false,
                    }
                }
            })
        },
        addDirectConversation(state, action) {
            const this_conversation = action.payload.conversation;
            const user = this_conversation.participants.find(
                elm => elm._id.toString() !== action.payload.user_id
            );
            state.direct_chat.conversations.push({
                id: this_conversation._id,
                user_id: user._id,
                name: `${user.firstName} ${user.lastName}`,
                online: user.status === "Online",
                img: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
                msg: "",
                time: "9:36",
                unread: 0,
                pinned: false,
            })



        },
        setCurrentConversation(state, action) {
            state.direct_chat.current_conversation = action.payload;
        },
        clearCurrentMessages(state, action) {
            state.direct_chat.current_messages = []
        },
        fetchCurrentMessages(state, action) {
            const messages = action.payload.messages;
            const formatted_messages = messages.map((el) => ({
                id: el._id,
                type: "msg",
                subtype: el.type,
                message: el.text,
                incoming: el.to === action.payload.user_id,
                outgoing: el.from === action.payload.user_id,
            }));
            state.direct_chat.current_messages = formatted_messages;
        },
        addDirectMessage(state, action) {
            state.direct_chat.current_messages.push(action.payload.message);
        },
        updateCurrentConversation(state, action) {
            state.direct_chat.current_conversation = action.payload.current_conversation
        },
        updateConversationsList(state, action) {
            state.direct_chat.conversations = action.payload.conversations
        }

    }
})

export default slice.reducer;


export const FetchDirectConversations = ({ conversations, user_id }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.fetchDirectConversations({ conversations, user_id }))
    }
}


export const AddDirectConversation = ({ conversation, user_id }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.addDirectConversation({ conversation, user_id }))
    }
}
export const ClearCurrentMessages = () => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.clearCurrentMessages())
    }
}


export const UpdateDirectConversation = ({ conversation, user_id }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateDirectConversation({ conversation, user_id }))
    }
}

export const SetCurrentConversation = (current_conversation) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.setCurrentConversation(current_conversation));
    };
};


export const FetchCurrentMessages = ({ messages, user_id }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.fetchCurrentMessages({ messages, user_id }));
    }
}

export const AddDirectMessage = (message) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.addDirectMessage({ message }));
    }
}

export const UpdateCurrentConversation = (current_conversation) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateCurrentConversation({ current_conversation }))
    }
}
export const UpdateConversationsList = ({ conversations }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateConversationsList({ conversations }))
    }
}