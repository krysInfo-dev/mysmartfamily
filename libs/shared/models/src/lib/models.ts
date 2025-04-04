export interface ITest {
  id?: number;
  content?: string;
}

export interface IFindTest {
  count?: number;
  tests?: ITest[];
}
