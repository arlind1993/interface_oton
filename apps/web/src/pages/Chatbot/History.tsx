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


const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  position: relative
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

const TitleContainer = styled(InputContainer) <{
  enabled: boolean
}>`
  text-align: left;
  padding: 0px;
  min-width: 80px;
  border: 0px solid transparent;
`;


interface HistoryItem {
  id: string;
  name: string;
  tempName: string;
  timestamp: number;
  hover: boolean;
  renaming: boolean;
}

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
  const [data, setData] = useState<HistoryItem[]>([
    {
      id: "2",
      name: "d",
      tempName: "",
      timestamp: 1715076642000,
      hover: false,
      renaming: false,
    },
    {
      id: "1",
      name: "",
      tempName: "",
      timestamp: 1714990242000,
      hover: false,
      renaming: false,
    },
    {
      id: "5",
      name: "3",
      tempName: "",
      timestamp: 1713607842000,
      hover: false,
      renaming: false,
    },
    {
      id: "23",
      name: "432332",
      tempName: "",
      timestamp: 1716199842000,
      hover: false,
      renaming: false,
    },
  ]);



  const {chatId} = useParams<{ chatId: string;}>();
  console.log("ChatId: " + chatId);

  const handlePress = useCallback((item?: HistoryItem) => {
    console.log('Item pressed:', item);
    navigation(`/chatbot${item ? "/" + item.id :""}`);
  }, []);

  const handleRemoveItem = useCallback((item: HistoryItem, pos: number) => {
    if(item.id == chatId){
    handlePress();
    }
    console.log(item.id+ "------0-" +chatId);
    setData((data) => data.filter((item, index) => index !== pos));
    refs.current = refs.current.filter((_, index) => index !== pos);
      
  }, [chatId]);

  const handleItemAction = useCallback((
    item: HistoryItem,
    pos?: number,
    hover?: boolean,
    renaming?: boolean,
    name?: string,
    tempName?: string,
  ) => {
    const dcp = [...data];
    const index = pos ?? dcp.indexOf(item);
    if (index >= 0) {
      if (hover != undefined && hover != null) {
        item.hover = hover;
      }
      if (renaming != undefined && renaming != null) {
        item.renaming = renaming;
        if (renaming) {
          item.tempName = item.name;
          setTimeout(() => {
            if (refs.current[index]) {
              refs.current[index]?.focus();
            }
          });
        } else {
          console.log(item);
          item.tempName = "";
        }
        if (refs.current[index]) {
          refs.current[index]!.innerHTML = item.name;
        }
      }
      if (name != undefined && name != null) {
        item.name = name;
      }
      if (tempName != undefined && tempName != null) {
        item.tempName = tempName;
      }
      dcp[index] = item;
      setData(dcp);
    }
  }, [handleRemoveItem, data]);


  const renderItem = useCallback((item: HistoryItem, pos: number) => {
    const handleMouseEnter = () => handleItemAction(item, pos, true);
    const handleMouseLeave = () => handleItemAction(item, pos, false);
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => handleItemAction(item, pos, undefined, undefined, undefined, e.target.value);
    const handleEdit = () => handleItemAction(item, pos, undefined, true, undefined, item.renaming ? item.tempName : undefined);
    const handleSubmit = () => handleItemAction(item, pos, undefined, false, item.tempName);
    const handleCancel = () => handleItemAction(item, pos, undefined, false);
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
          <div style={{ display: 'flex' }}>
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
                onClick={() => handleRemoveItem(item, pos)}>
                <Trash style={{ width: 12, height: 12 }} />
              </SideButton>
            </MouseoverTooltip>
          </div>
        }
        <TimeInput>{timeAgo(item.timestamp)}</TimeInput>
      </HistoryButton>
    );
  }, [handleItemAction, handleRemoveItem, handlePress, chatId]);


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
      {data.map((item, pos) => renderItem(item, pos))}
    </Section>
  )
}

export default memo(Chatbot)
