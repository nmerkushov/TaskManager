﻿CREATE TABLE [dbo].[Bank] (
    [BankID]   INT           CONSTRAINT [DF_Bank_BankID] DEFAULT (NEXT VALUE FOR [SeqBankID]) NOT NULL,
    [BankName] VARCHAR (200) NOT NULL,
    CONSTRAINT [PK_Bank] PRIMARY KEY CLUSTERED ([BankID] ASC)
);

