import { id } from '@uniswap/uniswapx-sdk';
import { ChangeEvent, KeyboardEventHandler, memo, MutableRefObject, useCallback, useEffect, useRef } from 'react'
import styled, { CSSProperties } from 'styled-components'

const Input = styled.input<{ error?: boolean; fontSize?: string }>`
  font-size: ${({ fontSize }) => fontSize || '1.25rem'};
  outline: none;
  border: none;
  flex: 1 1 auto;
  width: 0;
  background-color: ${({ theme }) => theme.surface1};
  transition: color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  color: ${({ error, theme }) => (error ? theme.critical : theme.neutral1)};
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 535;
  width: 100%;
  padding: 0px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.neutral3};
  }
`

const TextAreaInput = styled.textarea<{ error?: boolean; fontSize?: string }>`
  font-size: ${({ fontSize }) => fontSize || '1.25rem'};
  outline: none;
  border: none;
  flex: 1 1 auto;
  width: 0;
  resize: none;
  background-color: ${({ theme }) => theme.surface1};
  transition: color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  color: ${({ error, theme }) => (error ? theme.critical : theme.neutral1)};
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 535;
  width: 100%;
  line-height: 1.2;
  padding: 0px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.neutral2};
  }
`

export const TextInput = ({
  className,
  value,
  onUserInput,
  placeholder,
  fontSize,
}: {
  className?: string
  value: string
  onUserInput: (value: string) => void
  placeholder: string
  fontSize: string
}) => {
  const handleInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onUserInput(event.target.value)
    },
    [onUserInput]
  )

  return (
    <div className={className}>
      <Input
        type="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        placeholder={placeholder || ''}
        onChange={handleInput}
        value={value}
        fontSize={fontSize}
      />
    </div>
  )
}

const simpleRefer = (obj: any): obj is MutableRefObject<HTMLTextAreaElement | null> => {
  return (obj as  MutableRefObject< HTMLTextAreaElement | null>).current !== undefined;
}

const objectRefer = (obj: any): obj is { key: string; refObject: (MutableRefObject<Record<string, HTMLTextAreaElement | null>>) } => {
  return (obj as { key: string; refObject: MutableRefObject<Record<string, HTMLTextAreaElement | null>>; }).key !== undefined;
}

export const ResizingTextArea = memo(
  ({
    className,
    value,
    onUserInput,
    placeholder,
    fontSize,
    disabled,
    refer,
    onKeyDown,
    style,
  }: {
    className?: string
    value: string
    onUserInput: (value: string) => void
    placeholder: string
    fontSize: string
    disabled?: boolean 
    refer?: MutableRefObject<HTMLTextAreaElement | null> | {
      key: string,
      refObject: (MutableRefObject<Record<string, HTMLTextAreaElement | null>>),
    }
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> 
    style?: CSSProperties
  }) => {
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const disable = disabled ?? false;
    const handleInput = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
      console.log("get info ", simpleRefer(refer) && refer?.current);
        if(refer){
          if(simpleRefer(refer) && refer.current){
            refer.current.style.height = 'auto'
            refer.current.style.height = refer.current.scrollHeight + 'px'
          }else if(objectRefer(refer) && refer.refObject.current[refer.key]){
            refer.refObject.current[refer.key]!.style.height = "auto"
            refer.refObject.current[refer.key]!.style.height = refer.refObject.current[refer.key]!.scrollHeight + 'px'
          }
        }else{
          if(inputRef.current){
            inputRef.current.style.height = 'auto'
            inputRef.current.style.height = inputRef.current.scrollHeight + 'px'
          }
        }
        onUserInput(event.target.value)
      },[value]
    )
    style ??= {};
    style.background = 'transparent';
    return (
      <TextAreaInput
        disabled = {disable}
        rows={1}
        style={style}
        className={className}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        placeholder={placeholder || ''}
        onChange={handleInput}
        onKeyDown={onKeyDown}
        value={value}
        fontSize={fontSize}
        ref={e=> {
          if(refer){
            if(simpleRefer(refer) && refer.current){
              refer.current = e;
            }else if(objectRefer(refer) && refer.refObject.current[refer.key]){
              refer.refObject.current[refer.key] = e;
            }
          }else{
            if(inputRef.current){
              inputRef.current = e;
            }
          }
        }}
      />
    )
  }
)

ResizingTextArea.displayName = 'ResizingTextArea'
