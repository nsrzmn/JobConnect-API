import { Dummy } from "@src/models/dummy";

export class DummyService {
    public dummyFunction = async (data: any): Promise<any> => {
        const dummy = new Dummy(data);
        await dummy.save();
        return dummy;
    };
  }
  