import { ColumnCenter } from "components/Column";
import { ChangeEvent, ClipboardEvent, createContext, useEffect, useState } from 'react'
import { BaseButton, ButtonEmphasis, ButtonPrimary, ButtonSize, ThemeButton } from 'components/Button'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import styled from "styled-components";
import { BackButton } from "./OtonWalletModal";
import { OtonModalType, setOtonModalType } from "state/otonWallet/reducer";
import { Passphrase } from "./Passphrase";

export function OtonLogged() {

    const dispatch = useAppDispatch();


    return (
        <ColumnCenter>
            <>
                Logged in
            </>
            <BackButton onClick={()=> dispatch(setOtonModalType(OtonModalType.Main))}/>
            
        </ColumnCenter>
    );
}