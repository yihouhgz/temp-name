export declare const components: (import("vue").DefineSetupFnComponent<{
    type: string;
    size: string;
    disabled: boolean;
    loading: boolean;
}, {}, {}, {
    type: string;
    size: string;
    disabled: boolean;
    loading: boolean;
} & {}, import("vue").PublicProps> | import("vue").DefineComponent<{}, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>)[];
type App = {
    use: (...args: unknown[]) => unknown;
    component: (name: string, component: any) => void;
};
export declare const install: (app: App) => void;
export {};
