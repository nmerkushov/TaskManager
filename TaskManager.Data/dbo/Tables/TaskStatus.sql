CREATE TABLE [dbo].[TaskStatus] (
    [TaskStatusID]   INT          NOT NULL,
    [TaskStatusName] VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_TaskStatus] PRIMARY KEY CLUSTERED ([TaskStatusID] ASC)
);

