import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket";
import { SelectConversation, showSnackBar } from "../../redux/slices/app";
import { AddDirectConversation, AddDirectMessage, UpdateDirectConversation, UpdateConversationsList, UpdateCurrentConversation } from "../../redux/slices/conversation";


const DashboardLayout = () => {

  const dispatch = useDispatch();

  const { isLoggedIn, user_id } = useSelector((state) => state.auth)
  const { conversations, current_conversation } = useSelector(state => state.conversations.direct_chat)

  useEffect(() => {
    if (isLoggedIn) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
      }

      window.onload();

      if (!socket) {
        connectSocket(user_id)
      }

      // "new_friend_request"

      socket?.on("new_friend_request", (data) => {
        dispatch(showSnackBar({ severity: "success", message: data.message }))
      });
      socket?.on("request_accepted", (data) => {
        dispatch(showSnackBar({ severity: "success", message: data.message }))
      });
      socket?.on("request_sent", (data) => {
        dispatch(showSnackBar({ severity: "success", message: data.message }))
      });

      socket?.on("start_chat", (data) => {
        const existing_conversation = conversations.find(el => el.id === data._id);
        if (existing_conversation) {
          dispatch(UpdateDirectConversation({ conversation: data, user_id }));
        } else {
          // add direct conversation
          dispatch(AddDirectConversation({ conversation: data, user_id }));
        }
        dispatch(SelectConversation({ room_id: data._id }));

      })

      socket?.on("is_user_active", (data) => {
        const updatedConversationsList = conversations.map(each => {
          if (each.user_id?.toString() === data?.user_id.toString()) return { ...each, online: data?.status }
          else return each
        })

        dispatch(UpdateConversationsList({ conversations: updatedConversationsList }))


        if (data?.user_id.toString() === current_conversation?.user_id) {
          dispatch(UpdateCurrentConversation({ ...current_conversation, online: data?.status }))
        }
      })

      socket?.on("new_message", (data) => {
        const message = data.message;
        // check if msg we got is from currently selected conversation
        if (current_conversation?.id?.toString() === data?.conversation_id?.toString()) {
          dispatch(
            AddDirectMessage({
              id: message._id,
              type: "msg",
              subtype: message.type,
              message: message.text,
              incoming: message.to === user_id,
              outgoing: message.from === user_id,
            })
          );
        }
      });

    }

    const unloadCallback = () => {
      if (!isLoggedIn) {
        const user_id = window.localStorage.getItem("user_id");
        console.log(user_id)
        socket?.emit("end", { user_id })
      }
    }


    return () => {
      socket?.off("new_friend_request");
      socket?.off("request_accepted");
      socket?.off("request_sent");
      socket?.off("start_chat");
      socket?.off("new_message");
      unloadCallback();
    }

  }, [isLoggedIn, socket, current_conversation])

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />
  }



  return (
    <Stack direction={"row"}>
      {/* SideBar */}
      <Sidebar />

      <Outlet />
    </Stack >
  );
};

export default DashboardLayout;
