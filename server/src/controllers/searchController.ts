import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const search = async (req: Request, res: Response): Promise<void> => {
  const { query } = req.query;
  try {
    const task = await prisma.task.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query as string,
            },
            description: {
              contains: query as string,
            },
          },
        ],
      },
    });

    const project = await prisma.project.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query as string,
            },
            description: {
              contains: query as string,
            },
          },
        ],
      },
    });

    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: query as string,
            },
          },
        ],
      },
    });

    res.json({ task, project, users });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Erorr performing search : ${error.message}` });
  }
};
