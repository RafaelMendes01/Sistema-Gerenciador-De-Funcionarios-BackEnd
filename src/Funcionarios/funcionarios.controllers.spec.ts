import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '../enum/role-enum';
import { CreateFuncionarioDto } from './dto/create.funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update.funcionario.dto';
import { FuncionarioService } from './funcionario.service';
import { FuncionariosController } from './funcionarios.controllers';
import { Funcionario } from './schemas/funcionario.schema';

const userList: Funcionario[] = [
  new Funcionario({ nome: 'rafael', email: 'rafael.tallos@gmail.com', senha: '123', role: Role.ADMIN }),
  new Funcionario({ nome: 'pedro', email: 'pedro.tallos@gmail.com', senha: '123', role: Role.USER }),
  new Funcionario({ nome: 'joao', email: 'joao.tallos@gmail.com', senha: '123', role: Role.ADMIN }),
]

const user = new Funcionario({
  nome: 'rafael',
  email: 'rafael.tallos2@gmail.com',
  senha: '123a',
  role: Role.ADMIN
})

describe('TesteController', () => {
  let userController: FuncionariosController;
  let userService: FuncionarioService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuncionariosController],
      providers: [{
        provide: FuncionarioService,
        useValue: {
          getUserbyEmail: jest.fn().mockResolvedValue(user),
          getUsers: jest.fn().mockResolvedValue(userList),
          createUser: jest.fn().mockResolvedValue(user),
          updateUser: jest.fn().mockResolvedValue(user),
          deleteUser: jest.fn().mockResolvedValue(true)
        }
      }],
    }).compile();

    userController = module.get<FuncionariosController>(FuncionariosController);
    userService = module.get<FuncionarioService>(FuncionarioService)
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });
  describe('getUsers', () => {
    it('e pra retornar uma lista de usuarios', async () => {

      const result = await userService.getUsers();

      expect(result).toEqual(userList);
      expect(typeof result).toEqual('object');
      expect(userService.getUsers).toHaveBeenCalledTimes(1)
    })
    it('e pra ser lançada uma exceção', () => {
      jest.spyOn(userService, 'getUsers').mockRejectedValueOnce(new Error());

      expect(userController.getUsers()).rejects.toThrowError();
    })
  })
  describe('createUser', () => {
    it('aqui um usuario deve ser criado', async () => {
      const body: CreateFuncionarioDto = {
        nome: 'rafael',
        email: 'rafael.tallos2@gmail.com',
        senha: '123a',
        role: Role.ADMIN
      }

      const result = await userController.createUser(body);

      expect(result).toEqual(user);
      expect(userService.createUser).toHaveBeenCalledTimes(1);
      expect(userService.createUser).toHaveBeenCalledWith(body.nome, body.email, body.senha, body.role)
    })
    it('e pra ser lançado um erro', () => {
      const body: CreateFuncionarioDto = {
        nome: 'rafael',
        email: 'rafael.tallos2@gmail.com',
        senha: '123a',
        role: Role.ADMIN
      }

      jest.spyOn(userService, 'createUser').mockRejectedValueOnce(new Error());

      expect(userController.createUser(body)).rejects.toThrowError()
    })
  })
  describe('getUserbyEmail', () => {
    it('e pra retornar um usuario', async () => {
      const email = 'rafael.tallos2@gmail.com';

      const result = await userController.getUser(email);

      expect(result).toEqual(user);
      expect(userService.getUserbyEmail).toHaveBeenCalledTimes(1);
    })
    it('e pra ser lançado um erro', () => {
      const email = 'rafael.tallos2@gmail.com';

      jest.spyOn(userService, 'getUserbyEmail').mockRejectedValueOnce(new Error());

      expect(userController.getUser(email)).rejects.toThrowError()
    })
  })
  describe('deleteUser', () => {
    it('e pra deletar um usuario', async () => {
      const email = 'rafael.tallos2@gmail.com';

      const result = await userController.deleteUser(email);

      expect(result).toEqual(true);
      expect(userService.deleteUser).toHaveBeenCalledTimes(1);
    })
    it('e pra ser lançado um erro', () => {
      const email = 'rafael.tallos2@gmail.com';

      jest.spyOn(userService, 'deleteUser').mockRejectedValueOnce(new Error());

      expect(userController.deleteUser(email)).rejects.toThrowError()
    })
  })
  describe('updateUser', () => {
    it('aqui um usuario deve ser atualizado', async () => {
      const body: UpdateFuncionarioDto = {
        nome: 'rafael',
        email: 'rafael.tallos2@gmail.com',
        senha: '123a',
        role: Role.ADMIN
      }
      const email = 'rafael.tallos@gmail.com';

      const result = await userController.updateUser(email, body);

      expect(result).toEqual(user);
      expect(userService.updateUser).toHaveBeenCalledTimes(1);
    })
    it('e pra ser lançado um erro', () => {
      const body: UpdateFuncionarioDto = {
        nome: 'rafael',
        email: 'rafael.tallos2@gmail.com',
        senha: '123a',
        role: Role.ADMIN
      }
      const email = 'rafael.tallos@gmail.com';

      jest.spyOn(userService, 'updateUser').mockRejectedValueOnce(new Error());

      expect(userController.updateUser(email, body)).rejects.toThrowError()
    })
  })
});