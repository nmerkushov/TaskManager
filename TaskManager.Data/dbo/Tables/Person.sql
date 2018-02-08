CREATE TABLE [dbo].[Person] (
    [PersonID]   INT           CONSTRAINT [DF_Person_PersonID] DEFAULT (NEXT VALUE FOR [SeqPersonID]) NOT NULL,
    [FIO]        VARCHAR (200) NOT NULL,
    [PhoneFaxes] VARCHAR (200) NULL,
    [Emails]     VARCHAR (200) NULL,
    CONSTRAINT [PK_Person] PRIMARY KEY CLUSTERED ([PersonID] ASC)
);

