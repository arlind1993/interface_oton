import { ButtonPrimary, ButtonSecondary, ThemeButton } from "components/Button";
import Row from "components/Row";
import { scrollbarStyle } from "components/SearchModal/CurrencyList/index.css";
import { InputContainer } from "components/Settings/Input";
import { ResizingTextArea } from "components/TextInput";
import { useIsChatbotPage } from "hooks/useIsChatbot";
import { memo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addChatItem, addHistoryItem, updateChatItem } from "state/chatbot/reducer";
import { useAppDispatch, useAppSelector } from "state/hooks";

import styled from 'styled-components'
import { Share } from "ui/src/components/icons";
import { v4 as uuid } from 'uuid';
import { witBotSendMessage, } from './request';
import { FullMessage, translateToMessage} from "./hooks";
import { Chain } from "uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks";



const Description = styled(InputContainer)<{
  enabled: boolean
}>`
  flex: 1;
  min-height: unset;
  text-align: left;
  margin-right: 10px;
  padding: ${({enabled}) => enabled ? "4px 8px" : "0px"};
  border-radius: ${({enabled}) => enabled ? "12px" : "0px"};
  border: ${({enabled, theme, error }) => ((enabled ? "1": "0") + "px solid "+(error ? theme.critical : theme.surface2))};
`;
const InputField = styled(ResizingTextArea)`
  overflow-y: auto;
  min-height: unset;
  max-height: 150px;
  padding: 8px 4px;
  height: auto;
`;

const SubmitButton = styled(ButtonPrimary)`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    padding: 0;
    margin: 5px;
`;

function ChatInput(){
    const navigator = useNavigate();
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const [input, setInput] = useState<string>("");
    const isInChatbot = useIsChatbotPage();
    const chats = useAppSelector((state) => state.chatbot.chats);
    const histories = useAppSelector((state) => state.chatbot.histories);
    const dispatch = useAppDispatch();
    const {chatId} = useParams<{chatId: string}>();

    const onSubmit = async (message: string) => {

      console.log('ON SUMBIT ::::::::::::::::::')
      message = message.trim()
      if(message == "") return; 
      setInput("");
      const userCid = uuid();
      const botCid = uuid();
      let historyId: string | null = null;
      if(isInChatbot && !chatId){
        historyId = uuid();
        dispatch(
          addHistoryItem({items:[{
            id: historyId,
            hover: false,
            name: message.split(" ")[0],
            tempName: "",
            renaming: false,
            timestamp: Date.now(),
            chats: [...histories["temp"].chats]
          }]})
        );
        navigator("/chatbot/"+historyId);
      }
      dispatch(
        addChatItem({items: [{
          id: userCid,
          hover: false,
          editing: false,
          isChatbotText: false,
          text: message,
          tempText: "",
          type: "text",
          status: "completed",                 
        }], historyId: historyId ?? chatId ?? "temp"})
      );

      console.log("uopt");
      dispatch(
        addChatItem({items:[{
          id: botCid,
          hover: false,
          editing: false,
          isChatbotText: true,
          text: "Providing an answer...",
          tempText: "",
          type: "text",
          status: "sending",                 
        }],historyId: historyId ?? chatId ?? "temp"})
      );

      console.log(message);

      console.log("add");
      witBotSendMessage(message).then(async(res)=>{
        let fullMessage: FullMessage = {
          text: "",
          type: "text"
        };
        if(res.error){
          fullMessage.text = "No response, Connection failed";
          fullMessage.status = "failed";
          dispatch(
            updateChatItem([{
              id: botCid,
              item: fullMessage
            }])
          );
        }else if(res.success){
          fullMessage = await translateToMessage(res.success, Object.values(Chain));
          fullMessage.status = "completed";
          console.log("fullMessageci", fullMessage)
          dispatch(
            updateChatItem([{
              id: botCid,
              item: fullMessage
            }])
          );
        }
      })
    };


    return (
        <Row style={{alignItems: 'flex-end'}}>
            <Description enabled={true}>
                <InputField 
                    refer={(e)=>inputRef.current = e}
                    fontSize='16'
                    placeholder='Message OTON AI'
                    className={`${scrollbarStyle}`}
                    onUserInput={(e)=> setInput(e)}
                    onKeyDown={(e)=>{
                    if(e.key === 'Enter' && !e.shiftKey){
                        e.preventDefault();
                        onSubmit(input);
                    }
                    }}
                    value={input} 
                />
            </Description>
            <SubmitButton onClick={()=>{
              onSubmit(input);
            }}>
                <Share style={{zIndex: 50, width: 15, height: 15}}></Share>
            </SubmitButton>
      </Row>
    );
  }
  
  
  export default memo(ChatInput)

  