import { Lube, Film } from './../interfaces/accessories.interface';
import prisma from '@/utils/client';
class AccessoriesService {
  public async fetchLubes(): Promise<Lube[]> {
    const lubes = await prisma.lube.findMany();

    return lubes;
  }

  public async fetchFilms(): Promise<Film[]> {
    const films = await prisma.film.findMany();

    return films;
  }
}

export default AccessoriesService;
