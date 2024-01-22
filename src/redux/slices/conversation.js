import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";

const user_id = window.localStorage.getItem("user_id")

const initialState = {
    direct_chat: {
        conversations: [],
        current_conversation: null,
        current_messages: []
    },
    group_chat: {

    }
}


const slice = createSlice({
    name: "conversations",
    initialState,
    reducers: {
        fetchDirectConversations(state, action) {
            const list = action.payload.conversation.map((el) => {
                const this_user = el.participants.find((elm) => elm._id.toString() !== user_id)
                return {
                    id: el._id,
                    user_id: this_user._id,
                    name: `${this_user.firstName} ${this_user.lastName}`,
                    online: this_user.status === "online",
                    img: faker.image.avatar(),
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
                    const user = this_conversation.participants.find((elm) => elm._id.toString() !== user_id)

                    return {
                        id: this_conversation._id,
                        user_id: user._id,
                        name: `${user.firstName} ${user.lastName}`,
                        online: user.status === "online",
                        img: faker.image.avatar(),
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
                elm => elm._id.toString() !== user_id
            );
            state.direct_chat.conversations.push({
                id: this_conversation._id,
                user_id: user._id,
                name: `${user.firstName} ${user.lastName}`,
                online: user.status === "online",
                img: faker.image.avatar(),
                msg: "",
                time: "9:36",
                unread: 0,
                pinned: false,
            })



        }
    }
})

export default slice.reducer;


export const FetchDirectConversations = ({ conversation }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.fetchDirectConversations({ conversation }))
    }
}


export const AddDirectConversation = ({ conversation }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.addDirectConversation({ conversation }))
    }
}


export const UpdateDirectConversation = ({ conversation }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateDirectConversation({ conversation }))
    }
}