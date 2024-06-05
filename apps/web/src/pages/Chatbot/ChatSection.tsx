import { ButtonEmphasis, ButtonPrimary, ButtonSecondary, ButtonSize, SmallButtonPrimary, ThemeButton } from 'components/Button';
import {ChangeEvent, KeyboardEvent, memo, useCallback, useEffect, useRef, useState} from 'react'
import { Button } from 'rebass';
import styled from 'styled-components'
import Tooltip, { MouseoverTooltip, TooltipSize } from 'components/Tooltip';
import { TimePast, Person, Pencil, Edit, CopyFilled } from 'ui/src/components/icons';
import { AiIcon, UniIcon } from 'components/Logo/UniIcon';
import { InputContainer, Input } from 'components/Settings/Input';
import { ResizingTextArea } from 'components/TextInput';
import { scrollbarStyle } from '../../components/SearchModal/CurrencyList/index.css';
import {Botkit} from "botkit";
import { ChatItem, removeChatItem, removeHistoryItem, updateChatItem, updateHistoryItem } from 'state/chatbot/reducer';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import ChatInput from './ChatInput';
import { useParams } from 'react-router-dom';



const Section = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`

const Chatbox = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
`

const ActionButton = styled(ThemeButton)`
  padding: 2px;
`
const iconActionStyle = {
  width: 14,
  height: 14,
};

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  background: ${({theme} )=> theme.surface3};
`;

const ChatInputContainer = styled.div`
  width: clamp(400px, 100%, 600px);
`;

const Title = styled.div`
  font-weight: 550;
  transform: scale(1.0);
`;

const Description = styled(InputContainer)<{
  enabled: boolean
}>`
  text-align: left;
  padding: ${({enabled}) => enabled ? "4px 8px" : "0px"};
  border-radius: ${({enabled}) => enabled ? "12px" : "0px"};
  border: ${({enabled, theme, error }) => ((enabled ? "1": "0") + "px solid "+(error ? theme.critical : theme.surface2))};
`;

const CircleContainer = styled.div`
  overflow: hidden;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  border: 2px solid #fafbfb;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fafbfb;
`;

const ActionContainer = styled.div`
  display: flex;
`;
const EditActionContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const InputField = styled(ResizingTextArea)`
  overflow-y: auto;
  max-height: 150px;
  height: auto;
`;

const ButtonActionPrimary = styled(ButtonPrimary)`
  font-size: 14px;
  padding: 3px 8px;
  width: unset;
`;

const ButtonActionSecondary = styled(ButtonSecondary)`
  font-size: 14px;
  padding: 3px 8px;
  width: unset;
`;


// const controller = new Botkit();

function ChatSection() {
  const dispatch = useAppDispatch();
  const chats = useAppSelector((state) => state.chatbot.chats);
  console.log(chats);
  const {chatId} = useParams<{ chatId: string;}>();
  const refs = useRef<Record<string, HTMLTextAreaElement | null>>({});
  const histories = useAppSelector((state) => state.chatbot.histories);
  console.log(histories);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chats.length]); //



  const renderItem = useCallback((item: ChatItem, id: string) => {
    const handleMouseEnter = () => {
      dispatch(
        updateChatItem([
          {id, item: {hover: true}}
        ])
      );
    }
    const handleMouseLeave = () => {
      dispatch(
        updateChatItem([
          {id, item: {hover: false}}
        ])
      );
    }
    const handleOnChange = (e: string)=>{
      dispatch(
        updateChatItem([
          {id, item: {tempText: e}}
        ])
      );
    }
    const handleEdit = () => {
      dispatch(
        updateChatItem([
          {id, item: {editing: true, tempText: item.editing ? item.tempText : item.text}}
        ])
      );
      setTimeout(()=>{
        refs.current[id]?.focus();
      });
    }
    const handleSubmit = () => {
      const trimmedMsg = item.tempText.trim();
      if(trimmedMsg === ""){

      }else{
        dispatch(
          updateChatItem([
            {id, item: {editing: true, text: trimmedMsg, tempText: ""}}
          ])
        );
        const removeChats: Array<string> = [];
        const leftChats: Array<string> = [];
        let after = false;
        if(chatId && chatId in histories){
          for(const cid of histories[chatId].chats){
            if(after){
              removeChats.push(cid);
            }else{
              leftChats.push(cid);
            }
            if(id === cid){
              after = true;
            }
          }
          dispatch(
            updateHistoryItem([
              {id, item: {chats: leftChats}}
            ])
          )
        }
        dispatch(
          removeChatItem({ids: removeChats, historyId: chatId})
        );
        for(const cid of removeChats){
          if(cid in chats){
            delete chats[cid];
          }
        }
      }
    };
    const handleCancel = () => {
      dispatch(
        updateChatItem([
          {id, item:{editing: false, tempText: ""}}
        ])
      );
    }
    const handleCopy = () => {
      navigator.clipboard.writeText(item.text);
    }
    const handleKeyPresses = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if(e.key === 'Enter' && !e.shiftKey){
        handleSubmit();
      }else if(e.key === 'Escape'){
        handleCancel();
      }
    }


    return (
      <Chatbox key={item.id} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}>
        <div>
          {item.isChatbotText
          ? <AiIcon width={25} height={25}/>
          : <CircleContainer>
            <Person style ={{width:"auto", height:"auto"}}/>
          </CircleContainer>}
        </div>
        <div style={{flex: 1}}>
          <Title>{item.isChatbotText ? "Oton AI" : "You"}</Title>
          <Description enabled={item.editing}>
            <InputField
              disabled = {!item.editing}
              fontSize='16'
              placeholder=''
              className={`${scrollbarStyle}`}
              onUserInput={handleOnChange}
              refer={(e) => refs.current[id] = e}
              onKeyDown={handleKeyPresses}
              value={item.editing ? item.tempText : item.text}
            />
          </Description>
          {item.editing 
          ? <EditActionContainer>
            <ButtonActionPrimary onClick={handleSubmit}>
              Submit 
            </ButtonActionPrimary>
            <ButtonActionSecondary onClick={handleCancel}>
              Cancel
            </ButtonActionSecondary>
          </EditActionContainer>
          :<ActionContainer style={{opacity: item.hover ? 1: 0}}>
            <MouseoverTooltip text="Copy" placement='bottom' size={TooltipSize.Auto}>
              <ActionButton emphasis={ButtonEmphasis.medium} size={ButtonSize.medium} 
                onClick={handleCopy}>
                <CopyFilled style={iconActionStyle}/>
              </ActionButton>
            </MouseoverTooltip>
            {false && item.isChatbotText && 
              (
              <MouseoverTooltip text="Regenerate" placement='bottom' size={TooltipSize.Auto}>
                <ActionButton emphasis={ButtonEmphasis.medium} size={ButtonSize.medium} 
                  onClick={()=>{

                  }}>
                  <TimePast style={iconActionStyle}/>
                </ActionButton>
              </MouseoverTooltip>)
            }
            {!item.isChatbotText &&
            <MouseoverTooltip text="Edit" placement='bottom' size={TooltipSize.Auto}>
              <ActionButton emphasis={ButtonEmphasis.medium} size={ButtonSize.medium} 
                onClick={handleEdit}>
                <Pencil style={iconActionStyle}/>
              </ActionButton>
            </MouseoverTooltip>
            }
          </ActionContainer>
          }
        </div>
        
      </Chatbox>
    );
  }, [chats, histories, chatId]);

  

  return (
    <Section>
      <ChatList className={`${scrollbarStyle}`} ref={(e)=>scrollRef.current = e}>
        {Object.entries(chats).map((e) => renderItem(e[1], e[0]))}
      </ChatList>
      <ChatInput/>
    </Section>
  );
}

export default memo(ChatSection);