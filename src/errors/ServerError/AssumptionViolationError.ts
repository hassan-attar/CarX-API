import ServerError, {ServerErrorOption} from "./ServerError";

interface AssumptionViolationErrorOptions extends ServerErrorOption{
    assumption: string;
    whereInitiated: string;
}
class AssumptionViolationError extends ServerError {
    public assumption: string;
    public whereInitiated: string;

    constructor(options: AssumptionViolationErrorOptions) {
        super(options);
        this.assumption = options.assumption;
        this.whereInitiated = options.whereInitiated;
    }
}

export default AssumptionViolationError;