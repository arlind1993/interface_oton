import { memo, useCallback, useRef, useEffect, KeyboardEvent, ChangeEvent, useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonEmphasis, ButtonSize, ThemeButton } from 'components/Button';
import moment from 'moment';
import { Edit, Trash } from 'ui/src/components/icons';
import { MouseoverTooltip, TooltipSize } from 'components/Tooltip';
import { InputContainer, Input } from 'components/Settings/Input';
import { HistoryItem, removeHistoryItem, resetTempHistory, updateHistoryItem } from 'state/chatbot/reducer';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { scrollbarStyle } from 'components/SearchModal/CurrencyList/index.css';
import Row from 'components/Row';
import { useScreenSize } from 'hooks/useScreenSize';
import { Z_INDEX } from 'theme/zIndex';


const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 5px;
  width: 150px;
  background: green;
  // background: ${({ theme }) => theme.surface1};
`

const HistoryButton = styled(ThemeButton)`
  width: 100%;
  height: 30px;
  justify-content: space-between;
  font-size : 12px;
  line-height: 12px;
  padding: 10px;
  border-radius: 10px;
  position: relative;

`;

const SideButton = styled(ThemeButton)`
  padding: 10px;
  background: transparent;
  padding: 2.5px;
`;

const SideText = styled.span`
  padding: 5px;
  align-self: end;
  font-size: 12px;
`;

const TimeInput = styled.span`
  position: absolute;
  font-size: 8px;
  bottom: -10px;
  right: 0;
`;

const HistoryContainer = styled.div`
    max-height: calc(100vh - 72px - 80px - 76px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const TitleContainer = styled(InputContainer) <{
  enabled: boolean
}>`
  text-align: left;
  padding: 0px;
  min-width: 80px;
  border: 0px solid transparent;
`;




export function timeAgo(inputTime: number) {// inputtime with ms
  const timeThen = moment.unix(inputTime / 1000);
  const timeNow = moment();
  const dailyDifference = timeNow.diff(timeThen, 'days');
  const weeklyDifference = timeNow.diff(timeThen, 'weeks');
  const monthlyDifference = timeNow.diff(timeThen, 'months');
  const yearlyDifference = timeNow.diff(timeThen, 'years');
  if (dailyDifference < 0) {
    return 'reverse';
  } else if (dailyDifference == 0) {
    return 'today'
  } else if (dailyDifference == 1) {
    return 'yesterday'
  } else if (dailyDifference < 7) {
    return dailyDifference + ' days ago';
  } else if (weeklyDifference == 1) {
    return '1 week ago';
  } else if (weeklyDifference <= 4 && monthlyDifference == 0) {
    return weeklyDifference + ' weeks ago';
  } else if (monthlyDifference == 1) {
    return '1 month ago';
  } else if (monthlyDifference < 12) {
    return monthlyDifference + ' months ago';
  } else if (yearlyDifference == 1) {
    return '1 year ago';
  } else {
    return yearlyDifference + ' years ago';
  }
}


function History({}) {

  const [isOpen ,setOpen] = useState<boolean>(true);
  const screen = useScreenSize();

  const refs = useRef<Record<string, HTMLInputElement | null>>({});
  const navigation = useNavigate();
  const histories = useAppSelector((state) => state.chatbot.histories);
  const dispatch = useAppDispatch();
  const {chatId} = useParams<{ chatId: string}>();

  useEffect(()=>{
    if(chatId && !(chatId in histories)){
      navigation("/chatbot");
    }
  },[chatId, histories])

  const handlePress = useCallback((item?: HistoryItem) => {
    if(item){
      navigation("/chatbot/"+ item.id);
    }else{
      navigation("/chatbot");
      dispatch(resetTempHistory());
    }
  }, [chatId]);

  const renderItem = useCallback((item: HistoryItem, id: string) => {
    const handleMouseEnter = () => {
      dispatch(
        updateHistoryItem([
          {id, item: {hover: true}}
        ])
      );
    }
    const handleMouseLeave = () => {
      dispatch(
        updateHistoryItem([
          {id, item: {hover: false}}
        ])
      );
    }
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>)=>{
      dispatch(
        updateHistoryItem([
          {id, item: {tempName: e.target.value}}
        ])
      );
    }
    const handleEdit = () => {
      dispatch(
        updateHistoryItem([
          {id, item: {renaming: true, tempName: item.renaming ? item.tempName : item.name}}
        ])
      );
      setTimeout(()=>{
        refs.current[id]?.focus();
      });
    }

    const handleSubmit = () => {
      const trimmedMsg = item.tempName.trim();
      if(trimmedMsg === "") return;

      dispatch(
        updateHistoryItem([
          {id, item: {renaming: false, name: trimmedMsg, tempName: ""}}
        ])
      )
    }

    const handleCancel = () => {
      dispatch(
        updateHistoryItem([
          {id, item:{renaming: false, tempName: ""}}
        ])
      );
    }

    const removeItem = () => {
      dispatch(
        removeHistoryItem({ids: [id], withChats: true})
      );
      if(id in refs.current){
        delete refs.current[id];
      }
    };
    
    const handleKeyPresses = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSubmit();
      } else if (e.key === 'Escape') {
        handleCancel();
      }
    };

    const handleBlur = ()=>{
      setTimeout(()=>{
        handleCancel()
      }, 150);
    }

    return (
      <HistoryButton key={item.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        emphasis={ButtonEmphasis.medium}
        size={ButtonSize.medium}
        >
        <SideButton
          emphasis={ButtonEmphasis.medium}
          size={ButtonSize.medium}
          onClickCapture={() => {
            if(item.renaming){
              handleSubmit();
            }else{
              handlePress(item)
            }
          }}
          >
            
          <TitleContainer
          enabled={item.renaming}>
          <Input
            ref={(e) => refs.current[id] = e}
            disabled={!item.renaming}
            value={item.renaming ? item.tempName : item.name}
            onKeyDown={handleKeyPresses}
            onChange={handleOnChange}
            onBlur={handleBlur}
            style={{ textAlign: 'left', }}
          />
          </TitleContainer>
        </SideButton>
        {(item.id == chatId || item.hover) &&
          <Row>
            <MouseoverTooltip text="Rename" placement='bottom' size={TooltipSize.Auto}>
              <SideButton emphasis={ButtonEmphasis.medium} size={ButtonSize.medium}
                onClickCapture={(e)=>{
                  e.stopPropagation();
                  handleEdit();
                }}>
                <Edit style={{ width: 12, height: 12 }} />
              </SideButton>
            </MouseoverTooltip>
            <MouseoverTooltip text="Delete" placement='bottom' size={TooltipSize.Auto}>
              <SideButton emphasis={ButtonEmphasis.medium} size={ButtonSize.medium}
                onClick={removeItem}>
                <Trash style={{ width: 12, height: 12 }} />
              </SideButton>
            </MouseoverTooltip>
          </Row>
        }
        <TimeInput>{timeAgo(item.timestamp)}</TimeInput>
      </HistoryButton>
    );
  }, [histories, chatId]);


  return (
    <Section style={ isOpen && screen.md? {} : {
        position: "fixed",
        zIndex: Z_INDEX.sticky,
        top: 72,
        bottom: 0,
        left: 0
      }}>
      <Row>
        <HistoryButton size={ButtonSize.medium} emphasis={ButtonEmphasis.medium} onClick={() => setOpen(!isOpen)}>
          {isOpen ? "<<": ">>"}
        </HistoryButton >
        <HistoryButton style={{flex: 1}} size={ButtonSize.medium} emphasis={ButtonEmphasis.medium} onClick={() => handlePress()}>
        <span>New Chat</span>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", }}>
          <span style={{ width: 12 }}>+</span>
        </div>
      </HistoryButton>
      </Row>
      
      {
        isOpen && (<div>
          <SideText>
            My History
          </SideText>
          <HistoryContainer className={`${scrollbarStyle}`}>
            {Object.entries(histories).filter(e => e[0] != "temp").map((e) => renderItem(e[1], e[0]))}
          </HistoryContainer>
        </div>)
      }
      
    </Section>
  )
}

export default memo(History)
