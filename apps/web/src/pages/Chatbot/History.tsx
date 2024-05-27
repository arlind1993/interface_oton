import { memo, useCallback, useRef, useState, Fragment, KeyboardEvent, ChangeEvent, useImperativeHandle } from 'react'
import { Button } from 'rebass';
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonEmphasis, ButtonSize, ThemeButton } from 'components/Button';
import { AiIcon, UniIcon } from 'components/Logo/UniIcon';
import moment, { months } from 'moment';
import { Edit, Trash } from 'ui/src/components/icons';
import { MouseoverTooltip, TooltipSize } from 'components/Tooltip';
import { InputContainer, Input } from 'components/Settings/Input';
import { addHistoryItem, emptyChats, HistoryItem, removeHistoryItem, updateHistoryItem } from 'state/chatbot/reducer';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { v4 as uuid } from 'uuid';
import { scrollbarStyle } from 'components/SearchModal/CurrencyList/index.css';
import Row from 'components/Row';


const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 5px;
  background: ${({ theme }) => theme.surface1};
`

const HistoryButton = styled(ThemeButton)`
  width: 150px;
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


function Chatbot() {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const navigation = useNavigate();

  const histories = useAppSelector((state) => state.chatbot.histories);
  const dispatch = useAppDispatch();
  const {chatId} = useParams<{ chatId: string;}>();

  const handlePress = useCallback((item?: HistoryItem) => {
    if(item){
      navigation("/chatbot/"+ item.id);
    }else{
      navigation("/chatbot");
      if(chatId != null && chatId != undefined){
        dispatch(emptyChats());
      }
      
    }

    
  }, [chatId]);

  const renderItem = useCallback((item: HistoryItem, pos: number) => {
    const handleMouseEnter = () => dispatch(updateHistoryItem({refs, pos, hover: true}));
    const handleMouseLeave = () => dispatch(updateHistoryItem({refs, pos, hover: false}));
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(updateHistoryItem({refs, pos, tempName: e.target.value}));
    const handleEdit = () => dispatch(updateHistoryItem({refs, pos, renaming: true, tempName: item.renaming ? item.tempName : undefined}));
    const handleSubmit = () => {
      dispatch(updateHistoryItem({refs, pos, renaming: false, name: item.tempName}));
    }
    const handleCancel = () => dispatch(updateHistoryItem({refs, pos, renaming: false}));
    const removeItem = () => dispatch(removeHistoryItem({refs, pos}));
    
    const handleKeyPresses = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSubmit();
      } else if (e.key === 'Escape') {
        handleCancel();
      }
    };
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
          onClickCapture={(e) => {
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
            ref={(e) => refs.current[pos] = e}
            disabled={!item.renaming}
            value={item.renaming ? item.tempName : item.name}
            onKeyDown={handleKeyPresses}
            onChange={handleOnChange}
            onBlur={(e)=>{
              setTimeout(()=>{
                handleCancel()
              }, 150);
            }}
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
    <Section>
      <HistoryButton size={ButtonSize.medium} emphasis={ButtonEmphasis.medium} onClick={() => handlePress()}>
        <AiIcon width={20} height={20} clickable={true} />
        <span>New Chat</span>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", }}>
          <span style={{ width: 12 }}>+</span>
        </div>
      </HistoryButton>
      <SideText>
        My History
      </SideText>
      <HistoryContainer className={`${scrollbarStyle}`}>
        {histories.map((item, pos) => renderItem(item, pos))}
      </HistoryContainer>
      
    </Section>
  )
}

export default memo(Chatbot)
