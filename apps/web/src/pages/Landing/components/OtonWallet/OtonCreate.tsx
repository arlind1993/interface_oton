import { ColumnCenter } from "components/Column";
import { ChangeEvent, ClipboardEvent, createContext, CSSProperties, FormEvent, useEffect, useState } from 'react'
import { BaseButton, ButtonEmphasis, ButtonPrimary, ButtonSize, ThemeButton } from 'components/Button'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import styled from "styled-components";
import { FormSubmitButton, FormSecondarySubmitButton, ModalHeading, EasyButton, BackButton, ModalDescription, useOtonWalletContext } from './OtonWalletModal';
import { Passphrase, PasswordCustomContainer, PasswordCustomInput, ShowHideIcon } from "./Passphrase";
import { BackArrow } from "ui/src/components/icons/BackArrow";
import { dispatch } from "d3";
import { OtonModalType, setOtonModalType, setPassphrase, updatePassphraseErrors, updatePassphrases } from "state/otonWallet/reducer";
import { Input, InputContainer } from "components/Settings/Input";
import { calculateStrength } from "./password";
import Row from "components/Row";
import { OtonUserInfo } from "./OtonUserInfo";
import createWallet from "./reqs/createWallet";
import { setOtonUserData } from "state/otonWalletPersist/reducer";
import { MouseoverTooltip, TooltipSize } from "components/Tooltip";
import { CopyFilled } from "ui/src/components/icons";

const FormSection = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;


const Container = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const SideButton = styled(ThemeButton)`
  background: transparent;
  padding: 2.5px;
`;


const Label = styled.label`
  padding: 2px 8px;
  font-size: 12px;
  color: ${({theme})=> theme.neutral2};
`

const BarContainer = styled.div`
    width: calc(100% - 27px);
    border-radius: 3px;
    border: 0.5px solid ${({theme})=> theme.neutral2};
    padding: 1px;
    opacity: 0.75;
    margin: 3px 0;
`
const Bar = styled.div<{color: string, score: number}>`
    width: max(2px, ${({score})=> score}%);
    background-color: ${({color})=> color};
    border-radius: 1px;
    height: 2px;
    transition: width 0.3s
`


const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px 32px;
  max-width: 600px;
`;

const CellContainer = styled.div`
    text-align: center;
    padding: 5px;
    border-radius: 5px;
    background-color: ${({theme})=> theme.surface1};
`;


export const BelowLabel = styled.div<{color?: string}>`
    ${({color})=> color? "color: " +color+";": ""}
    font-size: 9px;
`

export const ShowBar = ({value: {color, score, label}, style, prefix, postfix}: {
    prefix?: string, 
    postfix?: string, 
    style?: CSSProperties | undefined, 
    value: {
        color: string,
        score: number,
        label: string,
    }
})=>{
    return (
        <div style={style}>
            <BarContainer>
                <Bar color={color} score={score}/>
            </BarContainer>
            <Row gap="2px">
                {
                    prefix && <BelowLabel>
                        {prefix}
                    </BelowLabel>
                }
                <BelowLabel color={color}>
                {label}
                </BelowLabel>
                {
                    postfix && <BelowLabel>
                        {postfix}
                    </BelowLabel>
                }
            </Row>
        </div>
    )
}

enum ErrorType {
    small,
    unequal
}


export function OtonCreate() {
    const otonWallet = useOtonWalletContext();
    const [currPage, setCurrPage] = useState(0);
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState<ErrorType | null>(null);
    const [isVisiblePassword, setVisiblePassword] = useState(false);
    const [isVisibleConfirm, setVisibleConfirm] = useState(false);
    const [isImported, setImported] = useState<boolean>(false); 
    const passphrases = useAppSelector((state)=> state.otonWallet.passphrases);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        if((error == ErrorType.small && password.length >= 8) || (error == ErrorType.unequal && password == passwordConfirm)){
            setError(null);
        }
    },[password,passwordConfirm]);

    useEffect(()=>{
        if(currPage == 0){
            setImported(false);
        }
        setPassword("");
        setPasswordConfirm("");
        setVisiblePassword(false);
        setVisibleConfirm(false);
    }, [currPage]);

    const validate = () => {
        const data: {
            passphrase?: string
            error: Array<string>
        } = {
            error: []
        }
        console.log("validating:", passphrases);

        // const passphrase = "alter video cream staff fine under elegant shift prefer cloud inspire arrive"
        let changed = false;
        let pass = "";
        for(let i = 0; i< passphrases.length; i++){
            if(passphrases[i]){
                pass += passphrases[i] + (i == passphrases.length - 1 ? "":" ");
            }else{
                data.error[i] = "The passphrase nr "+ (i+1) + " is empty!";
                changed = true;
            }
        }
        data.passphrase = changed ? undefined : pass;
        return data
    }


    const passphraseSubmit = ()=>{
        const value = validate();
        console.log("lllll", value);
        if(value.passphrase){
            setCurrPage(1);
        }else{
            dispatch(updatePassphraseErrors(value.error));
        }
    }

    const handlePasswordCheck = () => {
        if(password.length < 8){
            setError(ErrorType.small);
            return;
        }
        if(password != passwordConfirm){
            setError(ErrorType.unequal);
            return;
        }
        if(isImported){
            if(passphrases.length == 12){
                const valid = validate();
                otonWallet.signInWithMnemonic(passphrases.join(" "));
                if(otonWallet){ 
                    proceed();
                }else{
                    dispatch(updatePassphraseErrors(valid.error));
                }
                
            }
        }else{
            otonWallet.createWallet();
            const phrase = (otonWallet.getPassphrase()?? "").split(" ");
            if(phrase.length == 12){
                dispatch(updatePassphrases(phrase));
                console.log(phrase);
                setCurrPage(2);
            }
        }
    }

    const proceed = ()=>{
        const data: OtonUserInfo = {
            address: otonWallet.getAddress()!,
            encryptedPassphrase: otonWallet.getEncryptedPassphrase(password)!,
            publicKey: otonWallet.getPublicKey()!,
        }
        createWallet(data).then(e => {
            if(e) {
                dispatch(setOtonUserData(data));
                dispatch(setOtonModalType(OtonModalType.Logged));
            }
        });
    }

    return (
        <ColumnCenter>
            {
                currPage == 0 ? <>
                    <ModalHeading>
                    Let's get started
                    </ModalHeading>
                    <ModalDescription>
                        Wallet account creation:
                    </ModalDescription>  
                    {!isImported ? <>
                        <BackButton onClick={()=> dispatch(setOtonModalType(OtonModalType.Main))}/>
                        <FormSubmitButton onClick={()=>setCurrPage(1)}>Create a new Wallet</FormSubmitButton> 
                        or
                        <FormSecondarySubmitButton onClick={()=>setImported(true)}>Import an existing wallet</FormSecondarySubmitButton>
                    </> : <>
                        <BackButton onClick={()=> setImported(false)}/>
                        <Passphrase/>
                        <FormSubmitButton style={{marginBottom: 20}} onClick={passphraseSubmit}>Confirm and Proceed</FormSubmitButton>
                    </>
                    }
                </> : currPage == 1 ? 
                <>
                    <ModalHeading>
                        Create password
                    </ModalHeading>
                    <ModalDescription>
                        This password will be used to unlock your wallet only on this device!
                    </ModalDescription>                        
                    <BackButton onClick={()=> setCurrPage(0)}/>
                    <FormSection>
                        <Form onSubmit={(e)=> e.preventDefault()}>
                        <Label>
                            Password
                        </Label>
                        <Container>
                            <PasswordCustomContainer error={error == ErrorType.small || error == ErrorType.unequal }>
                                <PasswordCustomInput 
                                    id={'input-create-password'}
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    type={isVisiblePassword? "text": "password"}
                                    autoComplete="off"
                                    data-testid={'input-create-password'}
                                />
                            </PasswordCustomContainer>
                            <SideButton 
                                id={`toggle-create-password`} 
                                data-testid={`toggle-create-password`} 
                                emphasis={ButtonEmphasis.medium} 
                                size={ButtonSize.medium} 
                                onClick={() => setVisiblePassword(!isVisiblePassword)}>
                            <ShowHideIcon isVisible={isVisiblePassword} />
                            </SideButton>
                        </Container>
                        <ShowBar 
                        style={{marginBottom: 10}} 
                        value={calculateStrength(password)} 
                        prefix="Password Strength:" 
                        postfix={error == ErrorType.small ? "Password is too small" : error == ErrorType.unequal ? "Passwords are not the same" : undefined}/>
                        <Label>
                        Confirm Password
                        </Label>
                        <Container>
                            <PasswordCustomContainer error={error == ErrorType.unequal}>
                                <PasswordCustomInput
                                    id={'input-create-confirm'}
                                    value={passwordConfirm}
                                    onChange={(e)=>setPasswordConfirm(e.target.value)}
                                    type={isVisibleConfirm? "text": "password"}
                                    autoComplete="off"
                                    data-testid={'input-create-confirm'}
                                />
                            </PasswordCustomContainer>
                            <SideButton 
                                id={`toggle-create-confirm`} 
                                data-testid={`toggle-create-confirm`} 
                                emphasis={ButtonEmphasis.medium} 
                                size={ButtonSize.medium} 
                                onClick={() => setVisibleConfirm(!isVisibleConfirm)}>
                            <ShowHideIcon isVisible={isVisibleConfirm} />
                            </SideButton>
                        </Container>
                        <BelowLabel>{error == ErrorType.unequal ? "Passwords are not the same" : ""}</BelowLabel>
                        <FormSubmitButton type="submit" onClick={handlePasswordCheck}>Unlock</FormSubmitButton>
                        </Form>
                    </FormSection>
                </>:
                <>
                    <ModalHeading>
                        Your passphrase
                    </ModalHeading>
                    <ModalDescription>
                        This passphrase is the most important key wich can change current password and you can use this to import it to another wallet, please save it somewhere safely!
                    </ModalDescription>    
                    
                    <GridContainer>
                        {
                        passphrases.map((e, index) => {
                            return (
                            <CellContainer onClick={()=> {
                                console.log(e);
                                navigator.clipboard.writeText(e);
                            }} key={"passphrase"+index}>
                                {e}
                            </CellContainer>
                            )
                        })
                        }
                    </GridContainer>
                    <Row>
                        <FormSubmitButton 
                            onClick={()=> {
                                const e = passphrases.join(" ");
                                console.log(e);
                                navigator.clipboard.writeText(e);
                            }}>
                            Copy <CopyFilled style={{width: 14,height: 14}}/> 
                        </FormSubmitButton>
                        <FormSubmitButton onClick={proceed}>Proceed</FormSubmitButton>
                    </Row>
                </>
            }
        </ColumnCenter>
    );
}
