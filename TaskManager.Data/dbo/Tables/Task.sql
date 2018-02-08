CREATE TABLE [dbo].[Task] (
    [TaskID]              INT           CONSTRAINT [DF_Task_TaskID] DEFAULT (NEXT VALUE FOR [SeqTaskID]) NOT NULL,
    [ProjectID]           INT           NOT NULL,
    [TaskName]            VARCHAR (300) NOT NULL,
    [Priority]            NUMERIC (1)   NOT NULL,
    [ResponsiblePersonID] INT           NULL,
    [UpToDate]            DATE          NULL,
    [StatusID]            INT           NULL,
    [Notes]               VARCHAR (300) NULL,
    [ResponseAction]      VARCHAR (200) NULL,
    CONSTRAINT [PK_Task] PRIMARY KEY CLUSTERED ([TaskID] ASC),
    CONSTRAINT [FK_Task_ResponsiblePerson] FOREIGN KEY ([ResponsiblePersonID]) REFERENCES [dbo].[Person] ([PersonID]),
    CONSTRAINT [FK_Task_Status] FOREIGN KEY ([StatusID]) REFERENCES [dbo].[TaskStatus] ([TaskStatusID])
);

