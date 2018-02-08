CREATE TABLE [dbo].[Project] (
    [ProjectID]       INT           CONSTRAINT [DF_Project_ProjectID] DEFAULT (NEXT VALUE FOR [SeqProjectID]) NOT NULL,
    [ProjectName]     VARCHAR (200) NOT NULL,
    [BankID]          INT           NULL,
    [ContactPersonID] INT           NULL,
    [Director]        VARCHAR (200) NULL,
    [PhoneFaxes]      VARCHAR (200) NULL,
    CONSTRAINT [PK_Project] PRIMARY KEY CLUSTERED ([ProjectID] ASC),
    CONSTRAINT [FK_Project_Bank] FOREIGN KEY ([BankID]) REFERENCES [dbo].[Bank] ([BankID]),
    CONSTRAINT [FK_Project_ContactPerson] FOREIGN KEY ([ContactPersonID]) REFERENCES [dbo].[Person] ([PersonID])
);

