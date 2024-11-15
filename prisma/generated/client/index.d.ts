
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ParkingSpot
 * 
 */
export type ParkingSpot = $Result.DefaultSelection<Prisma.$ParkingSpotPayload>
/**
 * Model ActiveRent
 * 
 */
export type ActiveRent = $Result.DefaultSelection<Prisma.$ActiveRentPayload>
/**
 * Model RentalHistory
 * 
 */
export type RentalHistory = $Result.DefaultSelection<Prisma.$RentalHistoryPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ParkingSpots
 * const parkingSpots = await prisma.parkingSpot.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more ParkingSpots
   * const parkingSpots = await prisma.parkingSpot.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.parkingSpot`: Exposes CRUD operations for the **ParkingSpot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ParkingSpots
    * const parkingSpots = await prisma.parkingSpot.findMany()
    * ```
    */
  get parkingSpot(): Prisma.ParkingSpotDelegate<ExtArgs>;

  /**
   * `prisma.activeRent`: Exposes CRUD operations for the **ActiveRent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActiveRents
    * const activeRents = await prisma.activeRent.findMany()
    * ```
    */
  get activeRent(): Prisma.ActiveRentDelegate<ExtArgs>;

  /**
   * `prisma.rentalHistory`: Exposes CRUD operations for the **RentalHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RentalHistories
    * const rentalHistories = await prisma.rentalHistory.findMany()
    * ```
    */
  get rentalHistory(): Prisma.RentalHistoryDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.21.1
   * Query Engine version: bf0e5e8a04cada8225617067eaa03d041e2bba36
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ParkingSpot: 'ParkingSpot',
    ActiveRent: 'ActiveRent',
    RentalHistory: 'RentalHistory'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "parkingSpot" | "activeRent" | "rentalHistory"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ParkingSpot: {
        payload: Prisma.$ParkingSpotPayload<ExtArgs>
        fields: Prisma.ParkingSpotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParkingSpotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParkingSpotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParkingSpotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParkingSpotPayload>
          }
          findFirst: {
            args: Prisma.ParkingSpotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParkingSpotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParkingSpotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParkingSpotPayload>
          }
          findMany: {
            args: Prisma.ParkingSpotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParkingSpotPayload>[]
          }
          create: {
            args: Prisma.ParkingSpotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParkingSpotPayload>
          }
          createMany: {
            args: Prisma.ParkingSpotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ParkingSpotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParkingSpotPayload>[]
          }
          delete: {
            args: Prisma.ParkingSpotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParkingSpotPayload>
          }
          update: {
            args: Prisma.ParkingSpotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParkingSpotPayload>
          }
          deleteMany: {
            args: Prisma.ParkingSpotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ParkingSpotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ParkingSpotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParkingSpotPayload>
          }
          aggregate: {
            args: Prisma.ParkingSpotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParkingSpot>
          }
          groupBy: {
            args: Prisma.ParkingSpotGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParkingSpotGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParkingSpotCountArgs<ExtArgs>
            result: $Utils.Optional<ParkingSpotCountAggregateOutputType> | number
          }
        }
      }
      ActiveRent: {
        payload: Prisma.$ActiveRentPayload<ExtArgs>
        fields: Prisma.ActiveRentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActiveRentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveRentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActiveRentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveRentPayload>
          }
          findFirst: {
            args: Prisma.ActiveRentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveRentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActiveRentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveRentPayload>
          }
          findMany: {
            args: Prisma.ActiveRentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveRentPayload>[]
          }
          create: {
            args: Prisma.ActiveRentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveRentPayload>
          }
          createMany: {
            args: Prisma.ActiveRentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActiveRentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveRentPayload>[]
          }
          delete: {
            args: Prisma.ActiveRentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveRentPayload>
          }
          update: {
            args: Prisma.ActiveRentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveRentPayload>
          }
          deleteMany: {
            args: Prisma.ActiveRentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActiveRentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ActiveRentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveRentPayload>
          }
          aggregate: {
            args: Prisma.ActiveRentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActiveRent>
          }
          groupBy: {
            args: Prisma.ActiveRentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActiveRentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActiveRentCountArgs<ExtArgs>
            result: $Utils.Optional<ActiveRentCountAggregateOutputType> | number
          }
        }
      }
      RentalHistory: {
        payload: Prisma.$RentalHistoryPayload<ExtArgs>
        fields: Prisma.RentalHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RentalHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RentalHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalHistoryPayload>
          }
          findFirst: {
            args: Prisma.RentalHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RentalHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalHistoryPayload>
          }
          findMany: {
            args: Prisma.RentalHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalHistoryPayload>[]
          }
          create: {
            args: Prisma.RentalHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalHistoryPayload>
          }
          createMany: {
            args: Prisma.RentalHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RentalHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalHistoryPayload>[]
          }
          delete: {
            args: Prisma.RentalHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalHistoryPayload>
          }
          update: {
            args: Prisma.RentalHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalHistoryPayload>
          }
          deleteMany: {
            args: Prisma.RentalHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RentalHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RentalHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalHistoryPayload>
          }
          aggregate: {
            args: Prisma.RentalHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRentalHistory>
          }
          groupBy: {
            args: Prisma.RentalHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<RentalHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.RentalHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<RentalHistoryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model ParkingSpot
   */

  export type AggregateParkingSpot = {
    _count: ParkingSpotCountAggregateOutputType | null
    _avg: ParkingSpotAvgAggregateOutputType | null
    _sum: ParkingSpotSumAggregateOutputType | null
    _min: ParkingSpotMinAggregateOutputType | null
    _max: ParkingSpotMaxAggregateOutputType | null
  }

  export type ParkingSpotAvgAggregateOutputType = {
    id: number | null
    latitude: number | null
    longitude: number | null
    hourlyRate: number | null
  }

  export type ParkingSpotSumAggregateOutputType = {
    id: number | null
    latitude: number | null
    longitude: number | null
    hourlyRate: number | null
  }

  export type ParkingSpotMinAggregateOutputType = {
    id: number | null
    userId: string | null
    latitude: number | null
    longitude: number | null
    address: string | null
    description: string | null
    hourlyRate: number | null
    startTime: Date | null
    endTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ParkingSpotMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    latitude: number | null
    longitude: number | null
    address: string | null
    description: string | null
    hourlyRate: number | null
    startTime: Date | null
    endTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ParkingSpotCountAggregateOutputType = {
    id: number
    userId: number
    latitude: number
    longitude: number
    address: number
    description: number
    hourlyRate: number
    startTime: number
    endTime: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ParkingSpotAvgAggregateInputType = {
    id?: true
    latitude?: true
    longitude?: true
    hourlyRate?: true
  }

  export type ParkingSpotSumAggregateInputType = {
    id?: true
    latitude?: true
    longitude?: true
    hourlyRate?: true
  }

  export type ParkingSpotMinAggregateInputType = {
    id?: true
    userId?: true
    latitude?: true
    longitude?: true
    address?: true
    description?: true
    hourlyRate?: true
    startTime?: true
    endTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ParkingSpotMaxAggregateInputType = {
    id?: true
    userId?: true
    latitude?: true
    longitude?: true
    address?: true
    description?: true
    hourlyRate?: true
    startTime?: true
    endTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ParkingSpotCountAggregateInputType = {
    id?: true
    userId?: true
    latitude?: true
    longitude?: true
    address?: true
    description?: true
    hourlyRate?: true
    startTime?: true
    endTime?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ParkingSpotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParkingSpot to aggregate.
     */
    where?: ParkingSpotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParkingSpots to fetch.
     */
    orderBy?: ParkingSpotOrderByWithRelationInput | ParkingSpotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParkingSpotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParkingSpots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParkingSpots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ParkingSpots
    **/
    _count?: true | ParkingSpotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ParkingSpotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ParkingSpotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParkingSpotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParkingSpotMaxAggregateInputType
  }

  export type GetParkingSpotAggregateType<T extends ParkingSpotAggregateArgs> = {
        [P in keyof T & keyof AggregateParkingSpot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParkingSpot[P]>
      : GetScalarType<T[P], AggregateParkingSpot[P]>
  }




  export type ParkingSpotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParkingSpotWhereInput
    orderBy?: ParkingSpotOrderByWithAggregationInput | ParkingSpotOrderByWithAggregationInput[]
    by: ParkingSpotScalarFieldEnum[] | ParkingSpotScalarFieldEnum
    having?: ParkingSpotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParkingSpotCountAggregateInputType | true
    _avg?: ParkingSpotAvgAggregateInputType
    _sum?: ParkingSpotSumAggregateInputType
    _min?: ParkingSpotMinAggregateInputType
    _max?: ParkingSpotMaxAggregateInputType
  }

  export type ParkingSpotGroupByOutputType = {
    id: number
    userId: string
    latitude: number
    longitude: number
    address: string
    description: string
    hourlyRate: number
    startTime: Date
    endTime: Date
    createdAt: Date
    updatedAt: Date
    _count: ParkingSpotCountAggregateOutputType | null
    _avg: ParkingSpotAvgAggregateOutputType | null
    _sum: ParkingSpotSumAggregateOutputType | null
    _min: ParkingSpotMinAggregateOutputType | null
    _max: ParkingSpotMaxAggregateOutputType | null
  }

  type GetParkingSpotGroupByPayload<T extends ParkingSpotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParkingSpotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParkingSpotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParkingSpotGroupByOutputType[P]>
            : GetScalarType<T[P], ParkingSpotGroupByOutputType[P]>
        }
      >
    >


  export type ParkingSpotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    latitude?: boolean
    longitude?: boolean
    address?: boolean
    description?: boolean
    hourlyRate?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["parkingSpot"]>

  export type ParkingSpotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    latitude?: boolean
    longitude?: boolean
    address?: boolean
    description?: boolean
    hourlyRate?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["parkingSpot"]>

  export type ParkingSpotSelectScalar = {
    id?: boolean
    userId?: boolean
    latitude?: boolean
    longitude?: boolean
    address?: boolean
    description?: boolean
    hourlyRate?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $ParkingSpotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ParkingSpot"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      latitude: number
      longitude: number
      address: string
      description: string
      hourlyRate: number
      startTime: Date
      endTime: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["parkingSpot"]>
    composites: {}
  }

  type ParkingSpotGetPayload<S extends boolean | null | undefined | ParkingSpotDefaultArgs> = $Result.GetResult<Prisma.$ParkingSpotPayload, S>

  type ParkingSpotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ParkingSpotFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ParkingSpotCountAggregateInputType | true
    }

  export interface ParkingSpotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ParkingSpot'], meta: { name: 'ParkingSpot' } }
    /**
     * Find zero or one ParkingSpot that matches the filter.
     * @param {ParkingSpotFindUniqueArgs} args - Arguments to find a ParkingSpot
     * @example
     * // Get one ParkingSpot
     * const parkingSpot = await prisma.parkingSpot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParkingSpotFindUniqueArgs>(args: SelectSubset<T, ParkingSpotFindUniqueArgs<ExtArgs>>): Prisma__ParkingSpotClient<$Result.GetResult<Prisma.$ParkingSpotPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ParkingSpot that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ParkingSpotFindUniqueOrThrowArgs} args - Arguments to find a ParkingSpot
     * @example
     * // Get one ParkingSpot
     * const parkingSpot = await prisma.parkingSpot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParkingSpotFindUniqueOrThrowArgs>(args: SelectSubset<T, ParkingSpotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ParkingSpotClient<$Result.GetResult<Prisma.$ParkingSpotPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ParkingSpot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingSpotFindFirstArgs} args - Arguments to find a ParkingSpot
     * @example
     * // Get one ParkingSpot
     * const parkingSpot = await prisma.parkingSpot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParkingSpotFindFirstArgs>(args?: SelectSubset<T, ParkingSpotFindFirstArgs<ExtArgs>>): Prisma__ParkingSpotClient<$Result.GetResult<Prisma.$ParkingSpotPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ParkingSpot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingSpotFindFirstOrThrowArgs} args - Arguments to find a ParkingSpot
     * @example
     * // Get one ParkingSpot
     * const parkingSpot = await prisma.parkingSpot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParkingSpotFindFirstOrThrowArgs>(args?: SelectSubset<T, ParkingSpotFindFirstOrThrowArgs<ExtArgs>>): Prisma__ParkingSpotClient<$Result.GetResult<Prisma.$ParkingSpotPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ParkingSpots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingSpotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ParkingSpots
     * const parkingSpots = await prisma.parkingSpot.findMany()
     * 
     * // Get first 10 ParkingSpots
     * const parkingSpots = await prisma.parkingSpot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const parkingSpotWithIdOnly = await prisma.parkingSpot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ParkingSpotFindManyArgs>(args?: SelectSubset<T, ParkingSpotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParkingSpotPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ParkingSpot.
     * @param {ParkingSpotCreateArgs} args - Arguments to create a ParkingSpot.
     * @example
     * // Create one ParkingSpot
     * const ParkingSpot = await prisma.parkingSpot.create({
     *   data: {
     *     // ... data to create a ParkingSpot
     *   }
     * })
     * 
     */
    create<T extends ParkingSpotCreateArgs>(args: SelectSubset<T, ParkingSpotCreateArgs<ExtArgs>>): Prisma__ParkingSpotClient<$Result.GetResult<Prisma.$ParkingSpotPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ParkingSpots.
     * @param {ParkingSpotCreateManyArgs} args - Arguments to create many ParkingSpots.
     * @example
     * // Create many ParkingSpots
     * const parkingSpot = await prisma.parkingSpot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ParkingSpotCreateManyArgs>(args?: SelectSubset<T, ParkingSpotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ParkingSpots and returns the data saved in the database.
     * @param {ParkingSpotCreateManyAndReturnArgs} args - Arguments to create many ParkingSpots.
     * @example
     * // Create many ParkingSpots
     * const parkingSpot = await prisma.parkingSpot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ParkingSpots and only return the `id`
     * const parkingSpotWithIdOnly = await prisma.parkingSpot.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ParkingSpotCreateManyAndReturnArgs>(args?: SelectSubset<T, ParkingSpotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParkingSpotPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ParkingSpot.
     * @param {ParkingSpotDeleteArgs} args - Arguments to delete one ParkingSpot.
     * @example
     * // Delete one ParkingSpot
     * const ParkingSpot = await prisma.parkingSpot.delete({
     *   where: {
     *     // ... filter to delete one ParkingSpot
     *   }
     * })
     * 
     */
    delete<T extends ParkingSpotDeleteArgs>(args: SelectSubset<T, ParkingSpotDeleteArgs<ExtArgs>>): Prisma__ParkingSpotClient<$Result.GetResult<Prisma.$ParkingSpotPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ParkingSpot.
     * @param {ParkingSpotUpdateArgs} args - Arguments to update one ParkingSpot.
     * @example
     * // Update one ParkingSpot
     * const parkingSpot = await prisma.parkingSpot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ParkingSpotUpdateArgs>(args: SelectSubset<T, ParkingSpotUpdateArgs<ExtArgs>>): Prisma__ParkingSpotClient<$Result.GetResult<Prisma.$ParkingSpotPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ParkingSpots.
     * @param {ParkingSpotDeleteManyArgs} args - Arguments to filter ParkingSpots to delete.
     * @example
     * // Delete a few ParkingSpots
     * const { count } = await prisma.parkingSpot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ParkingSpotDeleteManyArgs>(args?: SelectSubset<T, ParkingSpotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ParkingSpots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingSpotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ParkingSpots
     * const parkingSpot = await prisma.parkingSpot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ParkingSpotUpdateManyArgs>(args: SelectSubset<T, ParkingSpotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ParkingSpot.
     * @param {ParkingSpotUpsertArgs} args - Arguments to update or create a ParkingSpot.
     * @example
     * // Update or create a ParkingSpot
     * const parkingSpot = await prisma.parkingSpot.upsert({
     *   create: {
     *     // ... data to create a ParkingSpot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ParkingSpot we want to update
     *   }
     * })
     */
    upsert<T extends ParkingSpotUpsertArgs>(args: SelectSubset<T, ParkingSpotUpsertArgs<ExtArgs>>): Prisma__ParkingSpotClient<$Result.GetResult<Prisma.$ParkingSpotPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ParkingSpots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingSpotCountArgs} args - Arguments to filter ParkingSpots to count.
     * @example
     * // Count the number of ParkingSpots
     * const count = await prisma.parkingSpot.count({
     *   where: {
     *     // ... the filter for the ParkingSpots we want to count
     *   }
     * })
    **/
    count<T extends ParkingSpotCountArgs>(
      args?: Subset<T, ParkingSpotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParkingSpotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ParkingSpot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingSpotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParkingSpotAggregateArgs>(args: Subset<T, ParkingSpotAggregateArgs>): Prisma.PrismaPromise<GetParkingSpotAggregateType<T>>

    /**
     * Group by ParkingSpot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingSpotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ParkingSpotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParkingSpotGroupByArgs['orderBy'] }
        : { orderBy?: ParkingSpotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ParkingSpotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParkingSpotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ParkingSpot model
   */
  readonly fields: ParkingSpotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ParkingSpot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParkingSpotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ParkingSpot model
   */ 
  interface ParkingSpotFieldRefs {
    readonly id: FieldRef<"ParkingSpot", 'Int'>
    readonly userId: FieldRef<"ParkingSpot", 'String'>
    readonly latitude: FieldRef<"ParkingSpot", 'Float'>
    readonly longitude: FieldRef<"ParkingSpot", 'Float'>
    readonly address: FieldRef<"ParkingSpot", 'String'>
    readonly description: FieldRef<"ParkingSpot", 'String'>
    readonly hourlyRate: FieldRef<"ParkingSpot", 'Int'>
    readonly startTime: FieldRef<"ParkingSpot", 'DateTime'>
    readonly endTime: FieldRef<"ParkingSpot", 'DateTime'>
    readonly createdAt: FieldRef<"ParkingSpot", 'DateTime'>
    readonly updatedAt: FieldRef<"ParkingSpot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ParkingSpot findUnique
   */
  export type ParkingSpotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSpot
     */
    select?: ParkingSpotSelect<ExtArgs> | null
    /**
     * Filter, which ParkingSpot to fetch.
     */
    where: ParkingSpotWhereUniqueInput
  }

  /**
   * ParkingSpot findUniqueOrThrow
   */
  export type ParkingSpotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSpot
     */
    select?: ParkingSpotSelect<ExtArgs> | null
    /**
     * Filter, which ParkingSpot to fetch.
     */
    where: ParkingSpotWhereUniqueInput
  }

  /**
   * ParkingSpot findFirst
   */
  export type ParkingSpotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSpot
     */
    select?: ParkingSpotSelect<ExtArgs> | null
    /**
     * Filter, which ParkingSpot to fetch.
     */
    where?: ParkingSpotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParkingSpots to fetch.
     */
    orderBy?: ParkingSpotOrderByWithRelationInput | ParkingSpotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParkingSpots.
     */
    cursor?: ParkingSpotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParkingSpots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParkingSpots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParkingSpots.
     */
    distinct?: ParkingSpotScalarFieldEnum | ParkingSpotScalarFieldEnum[]
  }

  /**
   * ParkingSpot findFirstOrThrow
   */
  export type ParkingSpotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSpot
     */
    select?: ParkingSpotSelect<ExtArgs> | null
    /**
     * Filter, which ParkingSpot to fetch.
     */
    where?: ParkingSpotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParkingSpots to fetch.
     */
    orderBy?: ParkingSpotOrderByWithRelationInput | ParkingSpotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParkingSpots.
     */
    cursor?: ParkingSpotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParkingSpots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParkingSpots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParkingSpots.
     */
    distinct?: ParkingSpotScalarFieldEnum | ParkingSpotScalarFieldEnum[]
  }

  /**
   * ParkingSpot findMany
   */
  export type ParkingSpotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSpot
     */
    select?: ParkingSpotSelect<ExtArgs> | null
    /**
     * Filter, which ParkingSpots to fetch.
     */
    where?: ParkingSpotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParkingSpots to fetch.
     */
    orderBy?: ParkingSpotOrderByWithRelationInput | ParkingSpotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ParkingSpots.
     */
    cursor?: ParkingSpotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParkingSpots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParkingSpots.
     */
    skip?: number
    distinct?: ParkingSpotScalarFieldEnum | ParkingSpotScalarFieldEnum[]
  }

  /**
   * ParkingSpot create
   */
  export type ParkingSpotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSpot
     */
    select?: ParkingSpotSelect<ExtArgs> | null
    /**
     * The data needed to create a ParkingSpot.
     */
    data: XOR<ParkingSpotCreateInput, ParkingSpotUncheckedCreateInput>
  }

  /**
   * ParkingSpot createMany
   */
  export type ParkingSpotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ParkingSpots.
     */
    data: ParkingSpotCreateManyInput | ParkingSpotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ParkingSpot createManyAndReturn
   */
  export type ParkingSpotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSpot
     */
    select?: ParkingSpotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ParkingSpots.
     */
    data: ParkingSpotCreateManyInput | ParkingSpotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ParkingSpot update
   */
  export type ParkingSpotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSpot
     */
    select?: ParkingSpotSelect<ExtArgs> | null
    /**
     * The data needed to update a ParkingSpot.
     */
    data: XOR<ParkingSpotUpdateInput, ParkingSpotUncheckedUpdateInput>
    /**
     * Choose, which ParkingSpot to update.
     */
    where: ParkingSpotWhereUniqueInput
  }

  /**
   * ParkingSpot updateMany
   */
  export type ParkingSpotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ParkingSpots.
     */
    data: XOR<ParkingSpotUpdateManyMutationInput, ParkingSpotUncheckedUpdateManyInput>
    /**
     * Filter which ParkingSpots to update
     */
    where?: ParkingSpotWhereInput
  }

  /**
   * ParkingSpot upsert
   */
  export type ParkingSpotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSpot
     */
    select?: ParkingSpotSelect<ExtArgs> | null
    /**
     * The filter to search for the ParkingSpot to update in case it exists.
     */
    where: ParkingSpotWhereUniqueInput
    /**
     * In case the ParkingSpot found by the `where` argument doesn't exist, create a new ParkingSpot with this data.
     */
    create: XOR<ParkingSpotCreateInput, ParkingSpotUncheckedCreateInput>
    /**
     * In case the ParkingSpot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParkingSpotUpdateInput, ParkingSpotUncheckedUpdateInput>
  }

  /**
   * ParkingSpot delete
   */
  export type ParkingSpotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSpot
     */
    select?: ParkingSpotSelect<ExtArgs> | null
    /**
     * Filter which ParkingSpot to delete.
     */
    where: ParkingSpotWhereUniqueInput
  }

  /**
   * ParkingSpot deleteMany
   */
  export type ParkingSpotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParkingSpots to delete
     */
    where?: ParkingSpotWhereInput
  }

  /**
   * ParkingSpot without action
   */
  export type ParkingSpotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingSpot
     */
    select?: ParkingSpotSelect<ExtArgs> | null
  }


  /**
   * Model ActiveRent
   */

  export type AggregateActiveRent = {
    _count: ActiveRentCountAggregateOutputType | null
    _avg: ActiveRentAvgAggregateOutputType | null
    _sum: ActiveRentSumAggregateOutputType | null
    _min: ActiveRentMinAggregateOutputType | null
    _max: ActiveRentMaxAggregateOutputType | null
  }

  export type ActiveRentAvgAggregateOutputType = {
    id: number | null
    parkingSpotId: number | null
  }

  export type ActiveRentSumAggregateOutputType = {
    id: number | null
    parkingSpotId: number | null
  }

  export type ActiveRentMinAggregateOutputType = {
    id: number | null
    userId: string | null
    parkingSpotId: number | null
    createdAt: Date | null
  }

  export type ActiveRentMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    parkingSpotId: number | null
    createdAt: Date | null
  }

  export type ActiveRentCountAggregateOutputType = {
    id: number
    userId: number
    parkingSpotId: number
    createdAt: number
    _all: number
  }


  export type ActiveRentAvgAggregateInputType = {
    id?: true
    parkingSpotId?: true
  }

  export type ActiveRentSumAggregateInputType = {
    id?: true
    parkingSpotId?: true
  }

  export type ActiveRentMinAggregateInputType = {
    id?: true
    userId?: true
    parkingSpotId?: true
    createdAt?: true
  }

  export type ActiveRentMaxAggregateInputType = {
    id?: true
    userId?: true
    parkingSpotId?: true
    createdAt?: true
  }

  export type ActiveRentCountAggregateInputType = {
    id?: true
    userId?: true
    parkingSpotId?: true
    createdAt?: true
    _all?: true
  }

  export type ActiveRentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActiveRent to aggregate.
     */
    where?: ActiveRentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveRents to fetch.
     */
    orderBy?: ActiveRentOrderByWithRelationInput | ActiveRentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActiveRentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveRents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveRents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActiveRents
    **/
    _count?: true | ActiveRentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActiveRentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActiveRentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActiveRentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActiveRentMaxAggregateInputType
  }

  export type GetActiveRentAggregateType<T extends ActiveRentAggregateArgs> = {
        [P in keyof T & keyof AggregateActiveRent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActiveRent[P]>
      : GetScalarType<T[P], AggregateActiveRent[P]>
  }




  export type ActiveRentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActiveRentWhereInput
    orderBy?: ActiveRentOrderByWithAggregationInput | ActiveRentOrderByWithAggregationInput[]
    by: ActiveRentScalarFieldEnum[] | ActiveRentScalarFieldEnum
    having?: ActiveRentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActiveRentCountAggregateInputType | true
    _avg?: ActiveRentAvgAggregateInputType
    _sum?: ActiveRentSumAggregateInputType
    _min?: ActiveRentMinAggregateInputType
    _max?: ActiveRentMaxAggregateInputType
  }

  export type ActiveRentGroupByOutputType = {
    id: number
    userId: string
    parkingSpotId: number
    createdAt: Date
    _count: ActiveRentCountAggregateOutputType | null
    _avg: ActiveRentAvgAggregateOutputType | null
    _sum: ActiveRentSumAggregateOutputType | null
    _min: ActiveRentMinAggregateOutputType | null
    _max: ActiveRentMaxAggregateOutputType | null
  }

  type GetActiveRentGroupByPayload<T extends ActiveRentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActiveRentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActiveRentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActiveRentGroupByOutputType[P]>
            : GetScalarType<T[P], ActiveRentGroupByOutputType[P]>
        }
      >
    >


  export type ActiveRentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    parkingSpotId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["activeRent"]>

  export type ActiveRentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    parkingSpotId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["activeRent"]>

  export type ActiveRentSelectScalar = {
    id?: boolean
    userId?: boolean
    parkingSpotId?: boolean
    createdAt?: boolean
  }


  export type $ActiveRentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActiveRent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      parkingSpotId: number
      createdAt: Date
    }, ExtArgs["result"]["activeRent"]>
    composites: {}
  }

  type ActiveRentGetPayload<S extends boolean | null | undefined | ActiveRentDefaultArgs> = $Result.GetResult<Prisma.$ActiveRentPayload, S>

  type ActiveRentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ActiveRentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ActiveRentCountAggregateInputType | true
    }

  export interface ActiveRentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActiveRent'], meta: { name: 'ActiveRent' } }
    /**
     * Find zero or one ActiveRent that matches the filter.
     * @param {ActiveRentFindUniqueArgs} args - Arguments to find a ActiveRent
     * @example
     * // Get one ActiveRent
     * const activeRent = await prisma.activeRent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActiveRentFindUniqueArgs>(args: SelectSubset<T, ActiveRentFindUniqueArgs<ExtArgs>>): Prisma__ActiveRentClient<$Result.GetResult<Prisma.$ActiveRentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ActiveRent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ActiveRentFindUniqueOrThrowArgs} args - Arguments to find a ActiveRent
     * @example
     * // Get one ActiveRent
     * const activeRent = await prisma.activeRent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActiveRentFindUniqueOrThrowArgs>(args: SelectSubset<T, ActiveRentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActiveRentClient<$Result.GetResult<Prisma.$ActiveRentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ActiveRent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveRentFindFirstArgs} args - Arguments to find a ActiveRent
     * @example
     * // Get one ActiveRent
     * const activeRent = await prisma.activeRent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActiveRentFindFirstArgs>(args?: SelectSubset<T, ActiveRentFindFirstArgs<ExtArgs>>): Prisma__ActiveRentClient<$Result.GetResult<Prisma.$ActiveRentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ActiveRent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveRentFindFirstOrThrowArgs} args - Arguments to find a ActiveRent
     * @example
     * // Get one ActiveRent
     * const activeRent = await prisma.activeRent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActiveRentFindFirstOrThrowArgs>(args?: SelectSubset<T, ActiveRentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActiveRentClient<$Result.GetResult<Prisma.$ActiveRentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ActiveRents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveRentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActiveRents
     * const activeRents = await prisma.activeRent.findMany()
     * 
     * // Get first 10 ActiveRents
     * const activeRents = await prisma.activeRent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activeRentWithIdOnly = await prisma.activeRent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActiveRentFindManyArgs>(args?: SelectSubset<T, ActiveRentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveRentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ActiveRent.
     * @param {ActiveRentCreateArgs} args - Arguments to create a ActiveRent.
     * @example
     * // Create one ActiveRent
     * const ActiveRent = await prisma.activeRent.create({
     *   data: {
     *     // ... data to create a ActiveRent
     *   }
     * })
     * 
     */
    create<T extends ActiveRentCreateArgs>(args: SelectSubset<T, ActiveRentCreateArgs<ExtArgs>>): Prisma__ActiveRentClient<$Result.GetResult<Prisma.$ActiveRentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ActiveRents.
     * @param {ActiveRentCreateManyArgs} args - Arguments to create many ActiveRents.
     * @example
     * // Create many ActiveRents
     * const activeRent = await prisma.activeRent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActiveRentCreateManyArgs>(args?: SelectSubset<T, ActiveRentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActiveRents and returns the data saved in the database.
     * @param {ActiveRentCreateManyAndReturnArgs} args - Arguments to create many ActiveRents.
     * @example
     * // Create many ActiveRents
     * const activeRent = await prisma.activeRent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActiveRents and only return the `id`
     * const activeRentWithIdOnly = await prisma.activeRent.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActiveRentCreateManyAndReturnArgs>(args?: SelectSubset<T, ActiveRentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveRentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ActiveRent.
     * @param {ActiveRentDeleteArgs} args - Arguments to delete one ActiveRent.
     * @example
     * // Delete one ActiveRent
     * const ActiveRent = await prisma.activeRent.delete({
     *   where: {
     *     // ... filter to delete one ActiveRent
     *   }
     * })
     * 
     */
    delete<T extends ActiveRentDeleteArgs>(args: SelectSubset<T, ActiveRentDeleteArgs<ExtArgs>>): Prisma__ActiveRentClient<$Result.GetResult<Prisma.$ActiveRentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ActiveRent.
     * @param {ActiveRentUpdateArgs} args - Arguments to update one ActiveRent.
     * @example
     * // Update one ActiveRent
     * const activeRent = await prisma.activeRent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActiveRentUpdateArgs>(args: SelectSubset<T, ActiveRentUpdateArgs<ExtArgs>>): Prisma__ActiveRentClient<$Result.GetResult<Prisma.$ActiveRentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ActiveRents.
     * @param {ActiveRentDeleteManyArgs} args - Arguments to filter ActiveRents to delete.
     * @example
     * // Delete a few ActiveRents
     * const { count } = await prisma.activeRent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActiveRentDeleteManyArgs>(args?: SelectSubset<T, ActiveRentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActiveRents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveRentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActiveRents
     * const activeRent = await prisma.activeRent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActiveRentUpdateManyArgs>(args: SelectSubset<T, ActiveRentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ActiveRent.
     * @param {ActiveRentUpsertArgs} args - Arguments to update or create a ActiveRent.
     * @example
     * // Update or create a ActiveRent
     * const activeRent = await prisma.activeRent.upsert({
     *   create: {
     *     // ... data to create a ActiveRent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActiveRent we want to update
     *   }
     * })
     */
    upsert<T extends ActiveRentUpsertArgs>(args: SelectSubset<T, ActiveRentUpsertArgs<ExtArgs>>): Prisma__ActiveRentClient<$Result.GetResult<Prisma.$ActiveRentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ActiveRents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveRentCountArgs} args - Arguments to filter ActiveRents to count.
     * @example
     * // Count the number of ActiveRents
     * const count = await prisma.activeRent.count({
     *   where: {
     *     // ... the filter for the ActiveRents we want to count
     *   }
     * })
    **/
    count<T extends ActiveRentCountArgs>(
      args?: Subset<T, ActiveRentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActiveRentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActiveRent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveRentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActiveRentAggregateArgs>(args: Subset<T, ActiveRentAggregateArgs>): Prisma.PrismaPromise<GetActiveRentAggregateType<T>>

    /**
     * Group by ActiveRent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveRentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActiveRentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActiveRentGroupByArgs['orderBy'] }
        : { orderBy?: ActiveRentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActiveRentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActiveRentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActiveRent model
   */
  readonly fields: ActiveRentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActiveRent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActiveRentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActiveRent model
   */ 
  interface ActiveRentFieldRefs {
    readonly id: FieldRef<"ActiveRent", 'Int'>
    readonly userId: FieldRef<"ActiveRent", 'String'>
    readonly parkingSpotId: FieldRef<"ActiveRent", 'Int'>
    readonly createdAt: FieldRef<"ActiveRent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActiveRent findUnique
   */
  export type ActiveRentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveRent
     */
    select?: ActiveRentSelect<ExtArgs> | null
    /**
     * Filter, which ActiveRent to fetch.
     */
    where: ActiveRentWhereUniqueInput
  }

  /**
   * ActiveRent findUniqueOrThrow
   */
  export type ActiveRentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveRent
     */
    select?: ActiveRentSelect<ExtArgs> | null
    /**
     * Filter, which ActiveRent to fetch.
     */
    where: ActiveRentWhereUniqueInput
  }

  /**
   * ActiveRent findFirst
   */
  export type ActiveRentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveRent
     */
    select?: ActiveRentSelect<ExtArgs> | null
    /**
     * Filter, which ActiveRent to fetch.
     */
    where?: ActiveRentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveRents to fetch.
     */
    orderBy?: ActiveRentOrderByWithRelationInput | ActiveRentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActiveRents.
     */
    cursor?: ActiveRentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveRents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveRents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActiveRents.
     */
    distinct?: ActiveRentScalarFieldEnum | ActiveRentScalarFieldEnum[]
  }

  /**
   * ActiveRent findFirstOrThrow
   */
  export type ActiveRentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveRent
     */
    select?: ActiveRentSelect<ExtArgs> | null
    /**
     * Filter, which ActiveRent to fetch.
     */
    where?: ActiveRentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveRents to fetch.
     */
    orderBy?: ActiveRentOrderByWithRelationInput | ActiveRentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActiveRents.
     */
    cursor?: ActiveRentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveRents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveRents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActiveRents.
     */
    distinct?: ActiveRentScalarFieldEnum | ActiveRentScalarFieldEnum[]
  }

  /**
   * ActiveRent findMany
   */
  export type ActiveRentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveRent
     */
    select?: ActiveRentSelect<ExtArgs> | null
    /**
     * Filter, which ActiveRents to fetch.
     */
    where?: ActiveRentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveRents to fetch.
     */
    orderBy?: ActiveRentOrderByWithRelationInput | ActiveRentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActiveRents.
     */
    cursor?: ActiveRentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveRents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveRents.
     */
    skip?: number
    distinct?: ActiveRentScalarFieldEnum | ActiveRentScalarFieldEnum[]
  }

  /**
   * ActiveRent create
   */
  export type ActiveRentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveRent
     */
    select?: ActiveRentSelect<ExtArgs> | null
    /**
     * The data needed to create a ActiveRent.
     */
    data: XOR<ActiveRentCreateInput, ActiveRentUncheckedCreateInput>
  }

  /**
   * ActiveRent createMany
   */
  export type ActiveRentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActiveRents.
     */
    data: ActiveRentCreateManyInput | ActiveRentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActiveRent createManyAndReturn
   */
  export type ActiveRentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveRent
     */
    select?: ActiveRentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ActiveRents.
     */
    data: ActiveRentCreateManyInput | ActiveRentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActiveRent update
   */
  export type ActiveRentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveRent
     */
    select?: ActiveRentSelect<ExtArgs> | null
    /**
     * The data needed to update a ActiveRent.
     */
    data: XOR<ActiveRentUpdateInput, ActiveRentUncheckedUpdateInput>
    /**
     * Choose, which ActiveRent to update.
     */
    where: ActiveRentWhereUniqueInput
  }

  /**
   * ActiveRent updateMany
   */
  export type ActiveRentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActiveRents.
     */
    data: XOR<ActiveRentUpdateManyMutationInput, ActiveRentUncheckedUpdateManyInput>
    /**
     * Filter which ActiveRents to update
     */
    where?: ActiveRentWhereInput
  }

  /**
   * ActiveRent upsert
   */
  export type ActiveRentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveRent
     */
    select?: ActiveRentSelect<ExtArgs> | null
    /**
     * The filter to search for the ActiveRent to update in case it exists.
     */
    where: ActiveRentWhereUniqueInput
    /**
     * In case the ActiveRent found by the `where` argument doesn't exist, create a new ActiveRent with this data.
     */
    create: XOR<ActiveRentCreateInput, ActiveRentUncheckedCreateInput>
    /**
     * In case the ActiveRent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActiveRentUpdateInput, ActiveRentUncheckedUpdateInput>
  }

  /**
   * ActiveRent delete
   */
  export type ActiveRentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveRent
     */
    select?: ActiveRentSelect<ExtArgs> | null
    /**
     * Filter which ActiveRent to delete.
     */
    where: ActiveRentWhereUniqueInput
  }

  /**
   * ActiveRent deleteMany
   */
  export type ActiveRentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActiveRents to delete
     */
    where?: ActiveRentWhereInput
  }

  /**
   * ActiveRent without action
   */
  export type ActiveRentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveRent
     */
    select?: ActiveRentSelect<ExtArgs> | null
  }


  /**
   * Model RentalHistory
   */

  export type AggregateRentalHistory = {
    _count: RentalHistoryCountAggregateOutputType | null
    _avg: RentalHistoryAvgAggregateOutputType | null
    _sum: RentalHistorySumAggregateOutputType | null
    _min: RentalHistoryMinAggregateOutputType | null
    _max: RentalHistoryMaxAggregateOutputType | null
  }

  export type RentalHistoryAvgAggregateOutputType = {
    id: number | null
    parkingSpotId: number | null
    totalCost: number | null
  }

  export type RentalHistorySumAggregateOutputType = {
    id: number | null
    parkingSpotId: number | null
    totalCost: number | null
  }

  export type RentalHistoryMinAggregateOutputType = {
    id: number | null
    userId: string | null
    parkingSpotId: number | null
    startDate: Date | null
    endDate: Date | null
    totalCost: number | null
  }

  export type RentalHistoryMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    parkingSpotId: number | null
    startDate: Date | null
    endDate: Date | null
    totalCost: number | null
  }

  export type RentalHistoryCountAggregateOutputType = {
    id: number
    userId: number
    parkingSpotId: number
    startDate: number
    endDate: number
    totalCost: number
    _all: number
  }


  export type RentalHistoryAvgAggregateInputType = {
    id?: true
    parkingSpotId?: true
    totalCost?: true
  }

  export type RentalHistorySumAggregateInputType = {
    id?: true
    parkingSpotId?: true
    totalCost?: true
  }

  export type RentalHistoryMinAggregateInputType = {
    id?: true
    userId?: true
    parkingSpotId?: true
    startDate?: true
    endDate?: true
    totalCost?: true
  }

  export type RentalHistoryMaxAggregateInputType = {
    id?: true
    userId?: true
    parkingSpotId?: true
    startDate?: true
    endDate?: true
    totalCost?: true
  }

  export type RentalHistoryCountAggregateInputType = {
    id?: true
    userId?: true
    parkingSpotId?: true
    startDate?: true
    endDate?: true
    totalCost?: true
    _all?: true
  }

  export type RentalHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RentalHistory to aggregate.
     */
    where?: RentalHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RentalHistories to fetch.
     */
    orderBy?: RentalHistoryOrderByWithRelationInput | RentalHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RentalHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RentalHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RentalHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RentalHistories
    **/
    _count?: true | RentalHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RentalHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RentalHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RentalHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RentalHistoryMaxAggregateInputType
  }

  export type GetRentalHistoryAggregateType<T extends RentalHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateRentalHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRentalHistory[P]>
      : GetScalarType<T[P], AggregateRentalHistory[P]>
  }




  export type RentalHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RentalHistoryWhereInput
    orderBy?: RentalHistoryOrderByWithAggregationInput | RentalHistoryOrderByWithAggregationInput[]
    by: RentalHistoryScalarFieldEnum[] | RentalHistoryScalarFieldEnum
    having?: RentalHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RentalHistoryCountAggregateInputType | true
    _avg?: RentalHistoryAvgAggregateInputType
    _sum?: RentalHistorySumAggregateInputType
    _min?: RentalHistoryMinAggregateInputType
    _max?: RentalHistoryMaxAggregateInputType
  }

  export type RentalHistoryGroupByOutputType = {
    id: number
    userId: string
    parkingSpotId: number
    startDate: Date
    endDate: Date
    totalCost: number
    _count: RentalHistoryCountAggregateOutputType | null
    _avg: RentalHistoryAvgAggregateOutputType | null
    _sum: RentalHistorySumAggregateOutputType | null
    _min: RentalHistoryMinAggregateOutputType | null
    _max: RentalHistoryMaxAggregateOutputType | null
  }

  type GetRentalHistoryGroupByPayload<T extends RentalHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RentalHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RentalHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RentalHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], RentalHistoryGroupByOutputType[P]>
        }
      >
    >


  export type RentalHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    parkingSpotId?: boolean
    startDate?: boolean
    endDate?: boolean
    totalCost?: boolean
  }, ExtArgs["result"]["rentalHistory"]>

  export type RentalHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    parkingSpotId?: boolean
    startDate?: boolean
    endDate?: boolean
    totalCost?: boolean
  }, ExtArgs["result"]["rentalHistory"]>

  export type RentalHistorySelectScalar = {
    id?: boolean
    userId?: boolean
    parkingSpotId?: boolean
    startDate?: boolean
    endDate?: boolean
    totalCost?: boolean
  }


  export type $RentalHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RentalHistory"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      parkingSpotId: number
      startDate: Date
      endDate: Date
      totalCost: number
    }, ExtArgs["result"]["rentalHistory"]>
    composites: {}
  }

  type RentalHistoryGetPayload<S extends boolean | null | undefined | RentalHistoryDefaultArgs> = $Result.GetResult<Prisma.$RentalHistoryPayload, S>

  type RentalHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RentalHistoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RentalHistoryCountAggregateInputType | true
    }

  export interface RentalHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RentalHistory'], meta: { name: 'RentalHistory' } }
    /**
     * Find zero or one RentalHistory that matches the filter.
     * @param {RentalHistoryFindUniqueArgs} args - Arguments to find a RentalHistory
     * @example
     * // Get one RentalHistory
     * const rentalHistory = await prisma.rentalHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RentalHistoryFindUniqueArgs>(args: SelectSubset<T, RentalHistoryFindUniqueArgs<ExtArgs>>): Prisma__RentalHistoryClient<$Result.GetResult<Prisma.$RentalHistoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RentalHistory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RentalHistoryFindUniqueOrThrowArgs} args - Arguments to find a RentalHistory
     * @example
     * // Get one RentalHistory
     * const rentalHistory = await prisma.rentalHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RentalHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, RentalHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RentalHistoryClient<$Result.GetResult<Prisma.$RentalHistoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RentalHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalHistoryFindFirstArgs} args - Arguments to find a RentalHistory
     * @example
     * // Get one RentalHistory
     * const rentalHistory = await prisma.rentalHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RentalHistoryFindFirstArgs>(args?: SelectSubset<T, RentalHistoryFindFirstArgs<ExtArgs>>): Prisma__RentalHistoryClient<$Result.GetResult<Prisma.$RentalHistoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RentalHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalHistoryFindFirstOrThrowArgs} args - Arguments to find a RentalHistory
     * @example
     * // Get one RentalHistory
     * const rentalHistory = await prisma.rentalHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RentalHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, RentalHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__RentalHistoryClient<$Result.GetResult<Prisma.$RentalHistoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RentalHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RentalHistories
     * const rentalHistories = await prisma.rentalHistory.findMany()
     * 
     * // Get first 10 RentalHistories
     * const rentalHistories = await prisma.rentalHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rentalHistoryWithIdOnly = await prisma.rentalHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RentalHistoryFindManyArgs>(args?: SelectSubset<T, RentalHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RentalHistoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RentalHistory.
     * @param {RentalHistoryCreateArgs} args - Arguments to create a RentalHistory.
     * @example
     * // Create one RentalHistory
     * const RentalHistory = await prisma.rentalHistory.create({
     *   data: {
     *     // ... data to create a RentalHistory
     *   }
     * })
     * 
     */
    create<T extends RentalHistoryCreateArgs>(args: SelectSubset<T, RentalHistoryCreateArgs<ExtArgs>>): Prisma__RentalHistoryClient<$Result.GetResult<Prisma.$RentalHistoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RentalHistories.
     * @param {RentalHistoryCreateManyArgs} args - Arguments to create many RentalHistories.
     * @example
     * // Create many RentalHistories
     * const rentalHistory = await prisma.rentalHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RentalHistoryCreateManyArgs>(args?: SelectSubset<T, RentalHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RentalHistories and returns the data saved in the database.
     * @param {RentalHistoryCreateManyAndReturnArgs} args - Arguments to create many RentalHistories.
     * @example
     * // Create many RentalHistories
     * const rentalHistory = await prisma.rentalHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RentalHistories and only return the `id`
     * const rentalHistoryWithIdOnly = await prisma.rentalHistory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RentalHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, RentalHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RentalHistoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RentalHistory.
     * @param {RentalHistoryDeleteArgs} args - Arguments to delete one RentalHistory.
     * @example
     * // Delete one RentalHistory
     * const RentalHistory = await prisma.rentalHistory.delete({
     *   where: {
     *     // ... filter to delete one RentalHistory
     *   }
     * })
     * 
     */
    delete<T extends RentalHistoryDeleteArgs>(args: SelectSubset<T, RentalHistoryDeleteArgs<ExtArgs>>): Prisma__RentalHistoryClient<$Result.GetResult<Prisma.$RentalHistoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RentalHistory.
     * @param {RentalHistoryUpdateArgs} args - Arguments to update one RentalHistory.
     * @example
     * // Update one RentalHistory
     * const rentalHistory = await prisma.rentalHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RentalHistoryUpdateArgs>(args: SelectSubset<T, RentalHistoryUpdateArgs<ExtArgs>>): Prisma__RentalHistoryClient<$Result.GetResult<Prisma.$RentalHistoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RentalHistories.
     * @param {RentalHistoryDeleteManyArgs} args - Arguments to filter RentalHistories to delete.
     * @example
     * // Delete a few RentalHistories
     * const { count } = await prisma.rentalHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RentalHistoryDeleteManyArgs>(args?: SelectSubset<T, RentalHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RentalHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RentalHistories
     * const rentalHistory = await prisma.rentalHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RentalHistoryUpdateManyArgs>(args: SelectSubset<T, RentalHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RentalHistory.
     * @param {RentalHistoryUpsertArgs} args - Arguments to update or create a RentalHistory.
     * @example
     * // Update or create a RentalHistory
     * const rentalHistory = await prisma.rentalHistory.upsert({
     *   create: {
     *     // ... data to create a RentalHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RentalHistory we want to update
     *   }
     * })
     */
    upsert<T extends RentalHistoryUpsertArgs>(args: SelectSubset<T, RentalHistoryUpsertArgs<ExtArgs>>): Prisma__RentalHistoryClient<$Result.GetResult<Prisma.$RentalHistoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RentalHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalHistoryCountArgs} args - Arguments to filter RentalHistories to count.
     * @example
     * // Count the number of RentalHistories
     * const count = await prisma.rentalHistory.count({
     *   where: {
     *     // ... the filter for the RentalHistories we want to count
     *   }
     * })
    **/
    count<T extends RentalHistoryCountArgs>(
      args?: Subset<T, RentalHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RentalHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RentalHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RentalHistoryAggregateArgs>(args: Subset<T, RentalHistoryAggregateArgs>): Prisma.PrismaPromise<GetRentalHistoryAggregateType<T>>

    /**
     * Group by RentalHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RentalHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RentalHistoryGroupByArgs['orderBy'] }
        : { orderBy?: RentalHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RentalHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRentalHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RentalHistory model
   */
  readonly fields: RentalHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RentalHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RentalHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RentalHistory model
   */ 
  interface RentalHistoryFieldRefs {
    readonly id: FieldRef<"RentalHistory", 'Int'>
    readonly userId: FieldRef<"RentalHistory", 'String'>
    readonly parkingSpotId: FieldRef<"RentalHistory", 'Int'>
    readonly startDate: FieldRef<"RentalHistory", 'DateTime'>
    readonly endDate: FieldRef<"RentalHistory", 'DateTime'>
    readonly totalCost: FieldRef<"RentalHistory", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * RentalHistory findUnique
   */
  export type RentalHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalHistory
     */
    select?: RentalHistorySelect<ExtArgs> | null
    /**
     * Filter, which RentalHistory to fetch.
     */
    where: RentalHistoryWhereUniqueInput
  }

  /**
   * RentalHistory findUniqueOrThrow
   */
  export type RentalHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalHistory
     */
    select?: RentalHistorySelect<ExtArgs> | null
    /**
     * Filter, which RentalHistory to fetch.
     */
    where: RentalHistoryWhereUniqueInput
  }

  /**
   * RentalHistory findFirst
   */
  export type RentalHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalHistory
     */
    select?: RentalHistorySelect<ExtArgs> | null
    /**
     * Filter, which RentalHistory to fetch.
     */
    where?: RentalHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RentalHistories to fetch.
     */
    orderBy?: RentalHistoryOrderByWithRelationInput | RentalHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RentalHistories.
     */
    cursor?: RentalHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RentalHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RentalHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RentalHistories.
     */
    distinct?: RentalHistoryScalarFieldEnum | RentalHistoryScalarFieldEnum[]
  }

  /**
   * RentalHistory findFirstOrThrow
   */
  export type RentalHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalHistory
     */
    select?: RentalHistorySelect<ExtArgs> | null
    /**
     * Filter, which RentalHistory to fetch.
     */
    where?: RentalHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RentalHistories to fetch.
     */
    orderBy?: RentalHistoryOrderByWithRelationInput | RentalHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RentalHistories.
     */
    cursor?: RentalHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RentalHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RentalHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RentalHistories.
     */
    distinct?: RentalHistoryScalarFieldEnum | RentalHistoryScalarFieldEnum[]
  }

  /**
   * RentalHistory findMany
   */
  export type RentalHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalHistory
     */
    select?: RentalHistorySelect<ExtArgs> | null
    /**
     * Filter, which RentalHistories to fetch.
     */
    where?: RentalHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RentalHistories to fetch.
     */
    orderBy?: RentalHistoryOrderByWithRelationInput | RentalHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RentalHistories.
     */
    cursor?: RentalHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RentalHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RentalHistories.
     */
    skip?: number
    distinct?: RentalHistoryScalarFieldEnum | RentalHistoryScalarFieldEnum[]
  }

  /**
   * RentalHistory create
   */
  export type RentalHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalHistory
     */
    select?: RentalHistorySelect<ExtArgs> | null
    /**
     * The data needed to create a RentalHistory.
     */
    data: XOR<RentalHistoryCreateInput, RentalHistoryUncheckedCreateInput>
  }

  /**
   * RentalHistory createMany
   */
  export type RentalHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RentalHistories.
     */
    data: RentalHistoryCreateManyInput | RentalHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RentalHistory createManyAndReturn
   */
  export type RentalHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalHistory
     */
    select?: RentalHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RentalHistories.
     */
    data: RentalHistoryCreateManyInput | RentalHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RentalHistory update
   */
  export type RentalHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalHistory
     */
    select?: RentalHistorySelect<ExtArgs> | null
    /**
     * The data needed to update a RentalHistory.
     */
    data: XOR<RentalHistoryUpdateInput, RentalHistoryUncheckedUpdateInput>
    /**
     * Choose, which RentalHistory to update.
     */
    where: RentalHistoryWhereUniqueInput
  }

  /**
   * RentalHistory updateMany
   */
  export type RentalHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RentalHistories.
     */
    data: XOR<RentalHistoryUpdateManyMutationInput, RentalHistoryUncheckedUpdateManyInput>
    /**
     * Filter which RentalHistories to update
     */
    where?: RentalHistoryWhereInput
  }

  /**
   * RentalHistory upsert
   */
  export type RentalHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalHistory
     */
    select?: RentalHistorySelect<ExtArgs> | null
    /**
     * The filter to search for the RentalHistory to update in case it exists.
     */
    where: RentalHistoryWhereUniqueInput
    /**
     * In case the RentalHistory found by the `where` argument doesn't exist, create a new RentalHistory with this data.
     */
    create: XOR<RentalHistoryCreateInput, RentalHistoryUncheckedCreateInput>
    /**
     * In case the RentalHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RentalHistoryUpdateInput, RentalHistoryUncheckedUpdateInput>
  }

  /**
   * RentalHistory delete
   */
  export type RentalHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalHistory
     */
    select?: RentalHistorySelect<ExtArgs> | null
    /**
     * Filter which RentalHistory to delete.
     */
    where: RentalHistoryWhereUniqueInput
  }

  /**
   * RentalHistory deleteMany
   */
  export type RentalHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RentalHistories to delete
     */
    where?: RentalHistoryWhereInput
  }

  /**
   * RentalHistory without action
   */
  export type RentalHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalHistory
     */
    select?: RentalHistorySelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ParkingSpotScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    latitude: 'latitude',
    longitude: 'longitude',
    address: 'address',
    description: 'description',
    hourlyRate: 'hourlyRate',
    startTime: 'startTime',
    endTime: 'endTime',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ParkingSpotScalarFieldEnum = (typeof ParkingSpotScalarFieldEnum)[keyof typeof ParkingSpotScalarFieldEnum]


  export const ActiveRentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    parkingSpotId: 'parkingSpotId',
    createdAt: 'createdAt'
  };

  export type ActiveRentScalarFieldEnum = (typeof ActiveRentScalarFieldEnum)[keyof typeof ActiveRentScalarFieldEnum]


  export const RentalHistoryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    parkingSpotId: 'parkingSpotId',
    startDate: 'startDate',
    endDate: 'endDate',
    totalCost: 'totalCost'
  };

  export type RentalHistoryScalarFieldEnum = (typeof RentalHistoryScalarFieldEnum)[keyof typeof RentalHistoryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    
  /**
   * Deep Input Types
   */


  export type ParkingSpotWhereInput = {
    AND?: ParkingSpotWhereInput | ParkingSpotWhereInput[]
    OR?: ParkingSpotWhereInput[]
    NOT?: ParkingSpotWhereInput | ParkingSpotWhereInput[]
    id?: IntFilter<"ParkingSpot"> | number
    userId?: StringFilter<"ParkingSpot"> | string
    latitude?: FloatFilter<"ParkingSpot"> | number
    longitude?: FloatFilter<"ParkingSpot"> | number
    address?: StringFilter<"ParkingSpot"> | string
    description?: StringFilter<"ParkingSpot"> | string
    hourlyRate?: IntFilter<"ParkingSpot"> | number
    startTime?: DateTimeFilter<"ParkingSpot"> | Date | string
    endTime?: DateTimeFilter<"ParkingSpot"> | Date | string
    createdAt?: DateTimeFilter<"ParkingSpot"> | Date | string
    updatedAt?: DateTimeFilter<"ParkingSpot"> | Date | string
  }

  export type ParkingSpotOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    description?: SortOrder
    hourlyRate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParkingSpotWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ParkingSpotWhereInput | ParkingSpotWhereInput[]
    OR?: ParkingSpotWhereInput[]
    NOT?: ParkingSpotWhereInput | ParkingSpotWhereInput[]
    userId?: StringFilter<"ParkingSpot"> | string
    latitude?: FloatFilter<"ParkingSpot"> | number
    longitude?: FloatFilter<"ParkingSpot"> | number
    address?: StringFilter<"ParkingSpot"> | string
    description?: StringFilter<"ParkingSpot"> | string
    hourlyRate?: IntFilter<"ParkingSpot"> | number
    startTime?: DateTimeFilter<"ParkingSpot"> | Date | string
    endTime?: DateTimeFilter<"ParkingSpot"> | Date | string
    createdAt?: DateTimeFilter<"ParkingSpot"> | Date | string
    updatedAt?: DateTimeFilter<"ParkingSpot"> | Date | string
  }, "id">

  export type ParkingSpotOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    description?: SortOrder
    hourlyRate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ParkingSpotCountOrderByAggregateInput
    _avg?: ParkingSpotAvgOrderByAggregateInput
    _max?: ParkingSpotMaxOrderByAggregateInput
    _min?: ParkingSpotMinOrderByAggregateInput
    _sum?: ParkingSpotSumOrderByAggregateInput
  }

  export type ParkingSpotScalarWhereWithAggregatesInput = {
    AND?: ParkingSpotScalarWhereWithAggregatesInput | ParkingSpotScalarWhereWithAggregatesInput[]
    OR?: ParkingSpotScalarWhereWithAggregatesInput[]
    NOT?: ParkingSpotScalarWhereWithAggregatesInput | ParkingSpotScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ParkingSpot"> | number
    userId?: StringWithAggregatesFilter<"ParkingSpot"> | string
    latitude?: FloatWithAggregatesFilter<"ParkingSpot"> | number
    longitude?: FloatWithAggregatesFilter<"ParkingSpot"> | number
    address?: StringWithAggregatesFilter<"ParkingSpot"> | string
    description?: StringWithAggregatesFilter<"ParkingSpot"> | string
    hourlyRate?: IntWithAggregatesFilter<"ParkingSpot"> | number
    startTime?: DateTimeWithAggregatesFilter<"ParkingSpot"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"ParkingSpot"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"ParkingSpot"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ParkingSpot"> | Date | string
  }

  export type ActiveRentWhereInput = {
    AND?: ActiveRentWhereInput | ActiveRentWhereInput[]
    OR?: ActiveRentWhereInput[]
    NOT?: ActiveRentWhereInput | ActiveRentWhereInput[]
    id?: IntFilter<"ActiveRent"> | number
    userId?: StringFilter<"ActiveRent"> | string
    parkingSpotId?: IntFilter<"ActiveRent"> | number
    createdAt?: DateTimeFilter<"ActiveRent"> | Date | string
  }

  export type ActiveRentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    parkingSpotId?: SortOrder
    createdAt?: SortOrder
  }

  export type ActiveRentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: string
    parkingSpotId?: number
    AND?: ActiveRentWhereInput | ActiveRentWhereInput[]
    OR?: ActiveRentWhereInput[]
    NOT?: ActiveRentWhereInput | ActiveRentWhereInput[]
    createdAt?: DateTimeFilter<"ActiveRent"> | Date | string
  }, "id" | "userId" | "parkingSpotId">

  export type ActiveRentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    parkingSpotId?: SortOrder
    createdAt?: SortOrder
    _count?: ActiveRentCountOrderByAggregateInput
    _avg?: ActiveRentAvgOrderByAggregateInput
    _max?: ActiveRentMaxOrderByAggregateInput
    _min?: ActiveRentMinOrderByAggregateInput
    _sum?: ActiveRentSumOrderByAggregateInput
  }

  export type ActiveRentScalarWhereWithAggregatesInput = {
    AND?: ActiveRentScalarWhereWithAggregatesInput | ActiveRentScalarWhereWithAggregatesInput[]
    OR?: ActiveRentScalarWhereWithAggregatesInput[]
    NOT?: ActiveRentScalarWhereWithAggregatesInput | ActiveRentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ActiveRent"> | number
    userId?: StringWithAggregatesFilter<"ActiveRent"> | string
    parkingSpotId?: IntWithAggregatesFilter<"ActiveRent"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ActiveRent"> | Date | string
  }

  export type RentalHistoryWhereInput = {
    AND?: RentalHistoryWhereInput | RentalHistoryWhereInput[]
    OR?: RentalHistoryWhereInput[]
    NOT?: RentalHistoryWhereInput | RentalHistoryWhereInput[]
    id?: IntFilter<"RentalHistory"> | number
    userId?: StringFilter<"RentalHistory"> | string
    parkingSpotId?: IntFilter<"RentalHistory"> | number
    startDate?: DateTimeFilter<"RentalHistory"> | Date | string
    endDate?: DateTimeFilter<"RentalHistory"> | Date | string
    totalCost?: FloatFilter<"RentalHistory"> | number
  }

  export type RentalHistoryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    parkingSpotId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    totalCost?: SortOrder
  }

  export type RentalHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RentalHistoryWhereInput | RentalHistoryWhereInput[]
    OR?: RentalHistoryWhereInput[]
    NOT?: RentalHistoryWhereInput | RentalHistoryWhereInput[]
    userId?: StringFilter<"RentalHistory"> | string
    parkingSpotId?: IntFilter<"RentalHistory"> | number
    startDate?: DateTimeFilter<"RentalHistory"> | Date | string
    endDate?: DateTimeFilter<"RentalHistory"> | Date | string
    totalCost?: FloatFilter<"RentalHistory"> | number
  }, "id">

  export type RentalHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    parkingSpotId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    totalCost?: SortOrder
    _count?: RentalHistoryCountOrderByAggregateInput
    _avg?: RentalHistoryAvgOrderByAggregateInput
    _max?: RentalHistoryMaxOrderByAggregateInput
    _min?: RentalHistoryMinOrderByAggregateInput
    _sum?: RentalHistorySumOrderByAggregateInput
  }

  export type RentalHistoryScalarWhereWithAggregatesInput = {
    AND?: RentalHistoryScalarWhereWithAggregatesInput | RentalHistoryScalarWhereWithAggregatesInput[]
    OR?: RentalHistoryScalarWhereWithAggregatesInput[]
    NOT?: RentalHistoryScalarWhereWithAggregatesInput | RentalHistoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RentalHistory"> | number
    userId?: StringWithAggregatesFilter<"RentalHistory"> | string
    parkingSpotId?: IntWithAggregatesFilter<"RentalHistory"> | number
    startDate?: DateTimeWithAggregatesFilter<"RentalHistory"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"RentalHistory"> | Date | string
    totalCost?: FloatWithAggregatesFilter<"RentalHistory"> | number
  }

  export type ParkingSpotCreateInput = {
    userId: string
    latitude: number
    longitude: number
    address: string
    description: string
    hourlyRate: number
    startTime: Date | string
    endTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParkingSpotUncheckedCreateInput = {
    id?: number
    userId: string
    latitude: number
    longitude: number
    address: string
    description: string
    hourlyRate: number
    startTime: Date | string
    endTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParkingSpotUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    hourlyRate?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParkingSpotUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    hourlyRate?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParkingSpotCreateManyInput = {
    id?: number
    userId: string
    latitude: number
    longitude: number
    address: string
    description: string
    hourlyRate: number
    startTime: Date | string
    endTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParkingSpotUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    hourlyRate?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParkingSpotUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    hourlyRate?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveRentCreateInput = {
    userId: string
    parkingSpotId: number
    createdAt?: Date | string
  }

  export type ActiveRentUncheckedCreateInput = {
    id?: number
    userId: string
    parkingSpotId: number
    createdAt?: Date | string
  }

  export type ActiveRentUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    parkingSpotId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveRentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    parkingSpotId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveRentCreateManyInput = {
    id?: number
    userId: string
    parkingSpotId: number
    createdAt?: Date | string
  }

  export type ActiveRentUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    parkingSpotId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveRentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    parkingSpotId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RentalHistoryCreateInput = {
    userId: string
    parkingSpotId: number
    startDate: Date | string
    endDate?: Date | string
    totalCost: number
  }

  export type RentalHistoryUncheckedCreateInput = {
    id?: number
    userId: string
    parkingSpotId: number
    startDate: Date | string
    endDate?: Date | string
    totalCost: number
  }

  export type RentalHistoryUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    parkingSpotId?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCost?: FloatFieldUpdateOperationsInput | number
  }

  export type RentalHistoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    parkingSpotId?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCost?: FloatFieldUpdateOperationsInput | number
  }

  export type RentalHistoryCreateManyInput = {
    id?: number
    userId: string
    parkingSpotId: number
    startDate: Date | string
    endDate?: Date | string
    totalCost: number
  }

  export type RentalHistoryUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    parkingSpotId?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCost?: FloatFieldUpdateOperationsInput | number
  }

  export type RentalHistoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    parkingSpotId?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCost?: FloatFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ParkingSpotCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    description?: SortOrder
    hourlyRate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParkingSpotAvgOrderByAggregateInput = {
    id?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    hourlyRate?: SortOrder
  }

  export type ParkingSpotMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    description?: SortOrder
    hourlyRate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParkingSpotMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    description?: SortOrder
    hourlyRate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParkingSpotSumOrderByAggregateInput = {
    id?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    hourlyRate?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ActiveRentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    parkingSpotId?: SortOrder
    createdAt?: SortOrder
  }

  export type ActiveRentAvgOrderByAggregateInput = {
    id?: SortOrder
    parkingSpotId?: SortOrder
  }

  export type ActiveRentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    parkingSpotId?: SortOrder
    createdAt?: SortOrder
  }

  export type ActiveRentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    parkingSpotId?: SortOrder
    createdAt?: SortOrder
  }

  export type ActiveRentSumOrderByAggregateInput = {
    id?: SortOrder
    parkingSpotId?: SortOrder
  }

  export type RentalHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    parkingSpotId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    totalCost?: SortOrder
  }

  export type RentalHistoryAvgOrderByAggregateInput = {
    id?: SortOrder
    parkingSpotId?: SortOrder
    totalCost?: SortOrder
  }

  export type RentalHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    parkingSpotId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    totalCost?: SortOrder
  }

  export type RentalHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    parkingSpotId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    totalCost?: SortOrder
  }

  export type RentalHistorySumOrderByAggregateInput = {
    id?: SortOrder
    parkingSpotId?: SortOrder
    totalCost?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ParkingSpotDefaultArgs instead
     */
    export type ParkingSpotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ParkingSpotDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ActiveRentDefaultArgs instead
     */
    export type ActiveRentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ActiveRentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RentalHistoryDefaultArgs instead
     */
    export type RentalHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RentalHistoryDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}