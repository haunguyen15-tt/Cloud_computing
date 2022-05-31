import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, Button, StyleSheet } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dialogflow_V2 } from 'react-native-dialogflow';

import { dialogFlowConfig } from '../config.dialog';

const avatar = require('../assets/download.jpg');

const BOT = {
  _id: 2,
  name: 'Demons Bot',
  avatar: avatar,
};

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 0,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 1,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  useEffect(() => {
    Dialogflow_V2.setConfiguration(
      dialogFlowConfig.client_email,
      dialogFlowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogFlowConfig.project_id
    );
  });

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));

    let message = messages[0].text;

    Dialogflow_V2.requestQuery(
      message,
      (result) => {
        handleGoogleResponse(result);
      },
      (err) => console.log(err)
    );
  }, []);

  const onQuickReply = (quickReply) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, quickReply));

    let message = quickReply[0].value;

    Dialogflow_V2.requestQuery(
      message,
      (result) => {
        handleGoogleResponse(result);
        console.log(result);
      },
      (err) => console.log(err)
    );
  };

  const handleGoogleResponse = (result) => {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    console.log(text);
    senBotResponse(text);
  };

  const senBotResponse = (text) => {
    let msg;

    if (text.includes('clothes')) {
      msg = {
        _id: Math.random(),
        text,
        image:
          'https://zunezx.com/upload/image/cache/data/banner/Tee/4A7FF33C-9F75-41FF-9938-13AABBF0D675-ff6-400-400.jpeg',
        createdAt: new Date(),
        user: BOT,
      };
    } else if (text.includes('show options')) {
      msg = {
        _id: Math.random(),
        text: 'Oke! Please choose some kind of this product which you like',
        createdAt: new Date(),
        user: BOT,
        quickReplies: {
          type: 'radio',
          keepIt: true,
          values: [
            { title: 'Blazer', value: 'Blazer' },
            { title: 'T-Shirt', value: 'T-Shirt' },
            { title: 'Shirt', value: 'Shirt' },
          ],
        },
      };
    } else {
      msg = {
        _id: Math.random(),
        text,
        createdAt: new Date(),
        user: BOT,
      };
    }

    setMessages((previousMessages) => GiftedChat.append(previousMessages, [msg]));
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name='send-circle'
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color='#2e64e5'
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name='angle-double-down' size={22} color='#333' />;
  };

  return (
    <View style={{ width: '100%', height: '100%', paddingBottom: 80 }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        onQuickReply={(quickReply) => onQuickReply(quickReply)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
