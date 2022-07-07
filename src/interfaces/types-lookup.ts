// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Compact, Enum, Null, Option, Result, Struct, Text, U8aFixed, Vec, bool, u128, u32, u64, u8 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, Call, H256, MultiAddress, Perbill } from '@polkadot/types/interfaces/runtime';
import type { Event } from '@polkadot/types/interfaces/system';

declare module '@polkadot/types/lookup' {
  /** @name FrameSystemAccountInfo (3) */
  export interface FrameSystemAccountInfo extends Struct {
    readonly nonce: u32;
    readonly consumers: u32;
    readonly providers: u32;
    readonly sufficients: u32;
    readonly data: PalletBalancesAccountData;
  }

  /** @name PalletBalancesAccountData (5) */
  export interface PalletBalancesAccountData extends Struct {
    readonly free: u128;
    readonly reserved: u128;
    readonly miscFrozen: u128;
    readonly feeFrozen: u128;
  }

  /** @name FrameSupportWeightsPerDispatchClassU64 (7) */
  export interface FrameSupportWeightsPerDispatchClassU64 extends Struct {
    readonly normal: u64;
    readonly operational: u64;
    readonly mandatory: u64;
  }

  /** @name SpRuntimeDigest (11) */
  export interface SpRuntimeDigest extends Struct {
    readonly logs: Vec<SpRuntimeDigestDigestItem>;
  }

  /** @name SpRuntimeDigestDigestItem (13) */
  export interface SpRuntimeDigestDigestItem extends Enum {
    readonly isOther: boolean;
    readonly asOther: Bytes;
    readonly isChangesTrieRoot: boolean;
    readonly asChangesTrieRoot: H256;
    readonly isConsensus: boolean;
    readonly asConsensus: ITuple<[U8aFixed, Bytes]>;
    readonly isSeal: boolean;
    readonly asSeal: ITuple<[U8aFixed, Bytes]>;
    readonly isPreRuntime: boolean;
    readonly asPreRuntime: ITuple<[U8aFixed, Bytes]>;
    readonly isChangesTrieSignal: boolean;
    readonly asChangesTrieSignal: SpRuntimeDigestChangesTrieSignal;
    readonly isRuntimeEnvironmentUpdated: boolean;
    readonly type: 'Other' | 'ChangesTrieRoot' | 'Consensus' | 'Seal' | 'PreRuntime' | 'ChangesTrieSignal' | 'RuntimeEnvironmentUpdated';
  }

  /** @name SpRuntimeDigestChangesTrieSignal (15) */
  export interface SpRuntimeDigestChangesTrieSignal extends Enum {
    readonly isNewConfiguration: boolean;
    readonly asNewConfiguration: Option<SpCoreChangesTrieChangesTrieConfiguration>;
    readonly type: 'NewConfiguration';
  }

  /** @name SpCoreChangesTrieChangesTrieConfiguration (17) */
  export interface SpCoreChangesTrieChangesTrieConfiguration extends Struct {
    readonly digestInterval: u32;
    readonly digestLevels: u32;
  }

  /** @name FrameSystemEventRecord (19) */
  export interface FrameSystemEventRecord extends Struct {
    readonly phase: FrameSystemPhase;
    readonly event: Event;
    readonly topics: Vec<H256>;
  }

  /** @name FrameSystemEvent (21) */
  export interface FrameSystemEvent extends Enum {
    readonly isExtrinsicSuccess: boolean;
    readonly asExtrinsicSuccess: FrameSupportWeightsDispatchInfo;
    readonly isExtrinsicFailed: boolean;
    readonly asExtrinsicFailed: ITuple<[SpRuntimeDispatchError, FrameSupportWeightsDispatchInfo]>;
    readonly isCodeUpdated: boolean;
    readonly isNewAccount: boolean;
    readonly asNewAccount: AccountId32;
    readonly isKilledAccount: boolean;
    readonly asKilledAccount: AccountId32;
    readonly isRemarked: boolean;
    readonly asRemarked: ITuple<[AccountId32, H256]>;
    readonly type: 'ExtrinsicSuccess' | 'ExtrinsicFailed' | 'CodeUpdated' | 'NewAccount' | 'KilledAccount' | 'Remarked';
  }

  /** @name FrameSupportWeightsDispatchInfo (22) */
  export interface FrameSupportWeightsDispatchInfo extends Struct {
    readonly weight: u64;
    readonly class: FrameSupportWeightsDispatchClass;
    readonly paysFee: FrameSupportWeightsPays;
  }

  /** @name FrameSupportWeightsDispatchClass (23) */
  export interface FrameSupportWeightsDispatchClass extends Enum {
    readonly isNormal: boolean;
    readonly isOperational: boolean;
    readonly isMandatory: boolean;
    readonly type: 'Normal' | 'Operational' | 'Mandatory';
  }

  /** @name FrameSupportWeightsPays (24) */
  export interface FrameSupportWeightsPays extends Enum {
    readonly isYes: boolean;
    readonly isNo: boolean;
    readonly type: 'Yes' | 'No';
  }

  /** @name SpRuntimeDispatchError (25) */
  export interface SpRuntimeDispatchError extends Enum {
    readonly isOther: boolean;
    readonly isCannotLookup: boolean;
    readonly isBadOrigin: boolean;
    readonly isModule: boolean;
    readonly asModule: {
      readonly index: u8;
      readonly error: u8;
    } & Struct;
    readonly isConsumerRemaining: boolean;
    readonly isNoProviders: boolean;
    readonly isToken: boolean;
    readonly asToken: SpRuntimeTokenError;
    readonly isArithmetic: boolean;
    readonly asArithmetic: SpRuntimeArithmeticError;
    readonly type: 'Other' | 'CannotLookup' | 'BadOrigin' | 'Module' | 'ConsumerRemaining' | 'NoProviders' | 'Token' | 'Arithmetic';
  }

  /** @name SpRuntimeTokenError (26) */
  export interface SpRuntimeTokenError extends Enum {
    readonly isNoFunds: boolean;
    readonly isWouldDie: boolean;
    readonly isBelowMinimum: boolean;
    readonly isCannotCreate: boolean;
    readonly isUnknownAsset: boolean;
    readonly isFrozen: boolean;
    readonly isUnsupported: boolean;
    readonly type: 'NoFunds' | 'WouldDie' | 'BelowMinimum' | 'CannotCreate' | 'UnknownAsset' | 'Frozen' | 'Unsupported';
  }

  /** @name SpRuntimeArithmeticError (27) */
  export interface SpRuntimeArithmeticError extends Enum {
    readonly isUnderflow: boolean;
    readonly isOverflow: boolean;
    readonly isDivisionByZero: boolean;
    readonly type: 'Underflow' | 'Overflow' | 'DivisionByZero';
  }

  /** @name PalletGrandpaEvent (28) */
  export interface PalletGrandpaEvent extends Enum {
    readonly isNewAuthorities: boolean;
    readonly asNewAuthorities: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    readonly isPaused: boolean;
    readonly isResumed: boolean;
    readonly type: 'NewAuthorities' | 'Paused' | 'Resumed';
  }

  /** @name SpFinalityGrandpaAppPublic (31) */
  export interface SpFinalityGrandpaAppPublic extends SpCoreEd25519Public {}

  /** @name SpCoreEd25519Public (32) */
  export interface SpCoreEd25519Public extends U8aFixed {}

  /** @name PalletBalancesEvent (33) */
  export interface PalletBalancesEvent extends Enum {
    readonly isEndowed: boolean;
    readonly asEndowed: ITuple<[AccountId32, u128]>;
    readonly isDustLost: boolean;
    readonly asDustLost: ITuple<[AccountId32, u128]>;
    readonly isTransfer: boolean;
    readonly asTransfer: ITuple<[AccountId32, AccountId32, u128]>;
    readonly isBalanceSet: boolean;
    readonly asBalanceSet: ITuple<[AccountId32, u128, u128]>;
    readonly isReserved: boolean;
    readonly asReserved: ITuple<[AccountId32, u128]>;
    readonly isUnreserved: boolean;
    readonly asUnreserved: ITuple<[AccountId32, u128]>;
    readonly isReserveRepatriated: boolean;
    readonly asReserveRepatriated: ITuple<[AccountId32, AccountId32, u128, FrameSupportTokensMiscBalanceStatus]>;
    readonly isDeposit: boolean;
    readonly asDeposit: ITuple<[AccountId32, u128]>;
    readonly isWithdraw: boolean;
    readonly asWithdraw: ITuple<[AccountId32, u128]>;
    readonly isSlashed: boolean;
    readonly asSlashed: ITuple<[AccountId32, u128]>;
    readonly type: 'Endowed' | 'DustLost' | 'Transfer' | 'BalanceSet' | 'Reserved' | 'Unreserved' | 'ReserveRepatriated' | 'Deposit' | 'Withdraw' | 'Slashed';
  }

  /** @name FrameSupportTokensMiscBalanceStatus (34) */
  export interface FrameSupportTokensMiscBalanceStatus extends Enum {
    readonly isFree: boolean;
    readonly isReserved: boolean;
    readonly type: 'Free' | 'Reserved';
  }

  /** @name PalletSudoEvent (35) */
  export interface PalletSudoEvent extends Enum {
    readonly isSudid: boolean;
    readonly asSudid: Result<Null, SpRuntimeDispatchError>;
    readonly isKeyChanged: boolean;
    readonly asKeyChanged: AccountId32;
    readonly isSudoAsDone: boolean;
    readonly asSudoAsDone: Result<Null, SpRuntimeDispatchError>;
    readonly type: 'Sudid' | 'KeyChanged' | 'SudoAsDone';
  }

  /** @name PalletTemplateEvent (38) */
  export interface PalletTemplateEvent extends Enum {
    readonly isSomethingStored: boolean;
    readonly asSomethingStored: ITuple<[u32, AccountId32]>;
    readonly type: 'SomethingStored';
  }

  /** @name PalletTaskEvent (39) */
  export interface PalletTaskEvent extends Enum {
    readonly isTaskCreated: boolean;
    readonly asTaskCreated: ITuple<[AccountId32, H256]>;
    readonly isTaskAssigned: boolean;
    readonly asTaskAssigned: ITuple<[AccountId32, H256]>;
    readonly isTaskCompleted: boolean;
    readonly asTaskCompleted: ITuple<[AccountId32, H256]>;
    readonly isTaskRemoved: boolean;
    readonly asTaskRemoved: ITuple<[AccountId32, H256]>;
    readonly type: 'TaskCreated' | 'TaskAssigned' | 'TaskCompleted' | 'TaskRemoved';
  }

  /** @name PalletProfileEvent (40) */
  export interface PalletProfileEvent extends Enum {
    readonly isProfileCreated: boolean;
    readonly asProfileCreated: {
      readonly who: AccountId32;
    } & Struct;
    readonly isProfileDeleted: boolean;
    readonly asProfileDeleted: {
      readonly who: AccountId32;
    } & Struct;
    readonly isProfileUpdated: boolean;
    readonly asProfileUpdated: {
      readonly who: AccountId32;
    } & Struct;
    readonly type: 'ProfileCreated' | 'ProfileDeleted' | 'ProfileUpdated';
  }

  /** @name PalletDaoEvent (41) */
  export interface PalletDaoEvent extends Enum {
    readonly isVisionCreated: boolean;
    readonly asVisionCreated: ITuple<[AccountId32, Bytes]>;
    readonly isVisionRemoved: boolean;
    readonly asVisionRemoved: ITuple<[AccountId32, Bytes]>;
    readonly isVisionSigned: boolean;
    readonly asVisionSigned: ITuple<[AccountId32, Bytes]>;
    readonly isVisionUnsigned: boolean;
    readonly asVisionUnsigned: ITuple<[AccountId32, Bytes]>;
    readonly isOrganizationCreated: boolean;
    readonly asOrganizationCreated: ITuple<[AccountId32, Bytes]>;
    readonly isOrganizationDissolved: boolean;
    readonly asOrganizationDissolved: ITuple<[AccountId32, Bytes]>;
    readonly isMemberAdded: boolean;
    readonly asMemberAdded: ITuple<[AccountId32, AccountId32]>;
    readonly isMemberRemoved: boolean;
    readonly asMemberRemoved: ITuple<[AccountId32, AccountId32]>;
    readonly isTaskAdded: boolean;
    readonly asTaskAdded: ITuple<[AccountId32, H256]>;
    readonly isTaskRemoved: boolean;
    readonly asTaskRemoved: ITuple<[AccountId32, H256]>;
    readonly type: 'VisionCreated' | 'VisionRemoved' | 'VisionSigned' | 'VisionUnsigned' | 'OrganizationCreated' | 'OrganizationDissolved' | 'MemberAdded' | 'MemberRemoved' | 'TaskAdded' | 'TaskRemoved';
  }

  /** @name FrameSystemPhase (42) */
  export interface FrameSystemPhase extends Enum {
    readonly isApplyExtrinsic: boolean;
    readonly asApplyExtrinsic: u32;
    readonly isFinalization: boolean;
    readonly isInitialization: boolean;
    readonly type: 'ApplyExtrinsic' | 'Finalization' | 'Initialization';
  }

  /** @name FrameSystemLastRuntimeUpgradeInfo (46) */
  export interface FrameSystemLastRuntimeUpgradeInfo extends Struct {
    readonly specVersion: Compact<u32>;
    readonly specName: Text;
  }

  /** @name FrameSystemCall (50) */
  export interface FrameSystemCall extends Enum {
    readonly isFillBlock: boolean;
    readonly asFillBlock: {
      readonly ratio: Perbill;
    } & Struct;
    readonly isRemark: boolean;
    readonly asRemark: {
      readonly remark: Bytes;
    } & Struct;
    readonly isSetHeapPages: boolean;
    readonly asSetHeapPages: {
      readonly pages: u64;
    } & Struct;
    readonly isSetCode: boolean;
    readonly asSetCode: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetCodeWithoutChecks: boolean;
    readonly asSetCodeWithoutChecks: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetChangesTrieConfig: boolean;
    readonly asSetChangesTrieConfig: {
      readonly changesTrieConfig: Option<SpCoreChangesTrieChangesTrieConfiguration>;
    } & Struct;
    readonly isSetStorage: boolean;
    readonly asSetStorage: {
      readonly items: Vec<ITuple<[Bytes, Bytes]>>;
    } & Struct;
    readonly isKillStorage: boolean;
    readonly asKillStorage: {
      readonly keys_: Vec<Bytes>;
    } & Struct;
    readonly isKillPrefix: boolean;
    readonly asKillPrefix: {
      readonly prefix: Bytes;
      readonly subkeys: u32;
    } & Struct;
    readonly isRemarkWithEvent: boolean;
    readonly asRemarkWithEvent: {
      readonly remark: Bytes;
    } & Struct;
    readonly type: 'FillBlock' | 'Remark' | 'SetHeapPages' | 'SetCode' | 'SetCodeWithoutChecks' | 'SetChangesTrieConfig' | 'SetStorage' | 'KillStorage' | 'KillPrefix' | 'RemarkWithEvent';
  }

  /** @name FrameSystemLimitsBlockWeights (55) */
  export interface FrameSystemLimitsBlockWeights extends Struct {
    readonly baseBlock: u64;
    readonly maxBlock: u64;
    readonly perClass: FrameSupportWeightsPerDispatchClassWeightsPerClass;
  }

  /** @name FrameSupportWeightsPerDispatchClassWeightsPerClass (56) */
  export interface FrameSupportWeightsPerDispatchClassWeightsPerClass extends Struct {
    readonly normal: FrameSystemLimitsWeightsPerClass;
    readonly operational: FrameSystemLimitsWeightsPerClass;
    readonly mandatory: FrameSystemLimitsWeightsPerClass;
  }

  /** @name FrameSystemLimitsWeightsPerClass (57) */
  export interface FrameSystemLimitsWeightsPerClass extends Struct {
    readonly baseExtrinsic: u64;
    readonly maxExtrinsic: Option<u64>;
    readonly maxTotal: Option<u64>;
    readonly reserved: Option<u64>;
  }

  /** @name FrameSystemLimitsBlockLength (59) */
  export interface FrameSystemLimitsBlockLength extends Struct {
    readonly max: FrameSupportWeightsPerDispatchClassU32;
  }

  /** @name FrameSupportWeightsPerDispatchClassU32 (60) */
  export interface FrameSupportWeightsPerDispatchClassU32 extends Struct {
    readonly normal: u32;
    readonly operational: u32;
    readonly mandatory: u32;
  }

  /** @name FrameSupportWeightsRuntimeDbWeight (61) */
  export interface FrameSupportWeightsRuntimeDbWeight extends Struct {
    readonly read: u64;
    readonly write: u64;
  }

  /** @name SpVersionRuntimeVersion (62) */
  export interface SpVersionRuntimeVersion extends Struct {
    readonly specName: Text;
    readonly implName: Text;
    readonly authoringVersion: u32;
    readonly specVersion: u32;
    readonly implVersion: u32;
    readonly apis: Vec<ITuple<[U8aFixed, u32]>>;
    readonly transactionVersion: u32;
  }

  /** @name FrameSystemError (68) */
  export interface FrameSystemError extends Enum {
    readonly isInvalidSpecName: boolean;
    readonly isSpecVersionNeedsToIncrease: boolean;
    readonly isFailedToExtractRuntimeVersion: boolean;
    readonly isNonDefaultComposite: boolean;
    readonly isNonZeroRefCount: boolean;
    readonly type: 'InvalidSpecName' | 'SpecVersionNeedsToIncrease' | 'FailedToExtractRuntimeVersion' | 'NonDefaultComposite' | 'NonZeroRefCount';
  }

  /** @name PalletTimestampCall (69) */
  export interface PalletTimestampCall extends Enum {
    readonly isSet: boolean;
    readonly asSet: {
      readonly now: Compact<u64>;
    } & Struct;
    readonly type: 'Set';
  }

  /** @name SpConsensusAuraSr25519AppSr25519Public (72) */
  export interface SpConsensusAuraSr25519AppSr25519Public extends SpCoreSr25519Public {}

  /** @name SpCoreSr25519Public (73) */
  export interface SpCoreSr25519Public extends U8aFixed {}

  /** @name PalletGrandpaStoredState (76) */
  export interface PalletGrandpaStoredState extends Enum {
    readonly isLive: boolean;
    readonly isPendingPause: boolean;
    readonly asPendingPause: {
      readonly scheduledAt: u32;
      readonly delay: u32;
    } & Struct;
    readonly isPaused: boolean;
    readonly isPendingResume: boolean;
    readonly asPendingResume: {
      readonly scheduledAt: u32;
      readonly delay: u32;
    } & Struct;
    readonly type: 'Live' | 'PendingPause' | 'Paused' | 'PendingResume';
  }

  /** @name PalletGrandpaStoredPendingChange (77) */
  export interface PalletGrandpaStoredPendingChange extends Struct {
    readonly scheduledAt: u32;
    readonly delay: u32;
    readonly nextAuthorities: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    readonly forced: Option<u32>;
  }

  /** @name PalletGrandpaCall (80) */
  export interface PalletGrandpaCall extends Enum {
    readonly isReportEquivocation: boolean;
    readonly asReportEquivocation: {
      readonly equivocationProof: SpFinalityGrandpaEquivocationProof;
      readonly keyOwnerProof: SpCoreVoid;
    } & Struct;
    readonly isReportEquivocationUnsigned: boolean;
    readonly asReportEquivocationUnsigned: {
      readonly equivocationProof: SpFinalityGrandpaEquivocationProof;
      readonly keyOwnerProof: SpCoreVoid;
    } & Struct;
    readonly isNoteStalled: boolean;
    readonly asNoteStalled: {
      readonly delay: u32;
      readonly bestFinalizedBlockNumber: u32;
    } & Struct;
    readonly type: 'ReportEquivocation' | 'ReportEquivocationUnsigned' | 'NoteStalled';
  }

  /** @name SpFinalityGrandpaEquivocationProof (81) */
  export interface SpFinalityGrandpaEquivocationProof extends Struct {
    readonly setId: u64;
    readonly equivocation: SpFinalityGrandpaEquivocation;
  }

  /** @name SpFinalityGrandpaEquivocation (82) */
  export interface SpFinalityGrandpaEquivocation extends Enum {
    readonly isPrevote: boolean;
    readonly asPrevote: FinalityGrandpaEquivocationPrevote;
    readonly isPrecommit: boolean;
    readonly asPrecommit: FinalityGrandpaEquivocationPrecommit;
    readonly type: 'Prevote' | 'Precommit';
  }

  /** @name FinalityGrandpaEquivocationPrevote (83) */
  export interface FinalityGrandpaEquivocationPrevote extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrevote (84) */
  export interface FinalityGrandpaPrevote extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpFinalityGrandpaAppSignature (85) */
  export interface SpFinalityGrandpaAppSignature extends SpCoreEd25519Signature {}

  /** @name SpCoreEd25519Signature (86) */
  export interface SpCoreEd25519Signature extends U8aFixed {}

  /** @name FinalityGrandpaEquivocationPrecommit (89) */
  export interface FinalityGrandpaEquivocationPrecommit extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrecommit (90) */
  export interface FinalityGrandpaPrecommit extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpCoreVoid (92) */
  export type SpCoreVoid = Null;

  /** @name PalletGrandpaError (93) */
  export interface PalletGrandpaError extends Enum {
    readonly isPauseFailed: boolean;
    readonly isResumeFailed: boolean;
    readonly isChangePending: boolean;
    readonly isTooSoon: boolean;
    readonly isInvalidKeyOwnershipProof: boolean;
    readonly isInvalidEquivocationProof: boolean;
    readonly isDuplicateOffenceReport: boolean;
    readonly type: 'PauseFailed' | 'ResumeFailed' | 'ChangePending' | 'TooSoon' | 'InvalidKeyOwnershipProof' | 'InvalidEquivocationProof' | 'DuplicateOffenceReport';
  }

  /** @name PalletBalancesBalanceLock (95) */
  export interface PalletBalancesBalanceLock extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
    readonly reasons: PalletBalancesReasons;
  }

  /** @name PalletBalancesReasons (96) */
  export interface PalletBalancesReasons extends Enum {
    readonly isFee: boolean;
    readonly isMisc: boolean;
    readonly isAll: boolean;
    readonly type: 'Fee' | 'Misc' | 'All';
  }

  /** @name PalletBalancesReserveData (99) */
  export interface PalletBalancesReserveData extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
  }

  /** @name PalletBalancesReleases (101) */
  export interface PalletBalancesReleases extends Enum {
    readonly isV100: boolean;
    readonly isV200: boolean;
    readonly type: 'V100' | 'V200';
  }

  /** @name PalletBalancesCall (102) */
  export interface PalletBalancesCall extends Enum {
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isSetBalance: boolean;
    readonly asSetBalance: {
      readonly who: MultiAddress;
      readonly newFree: Compact<u128>;
      readonly newReserved: Compact<u128>;
    } & Struct;
    readonly isForceTransfer: boolean;
    readonly asForceTransfer: {
      readonly source: MultiAddress;
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isTransferKeepAlive: boolean;
    readonly asTransferKeepAlive: {
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isTransferAll: boolean;
    readonly asTransferAll: {
      readonly dest: MultiAddress;
      readonly keepAlive: bool;
    } & Struct;
    readonly isForceUnreserve: boolean;
    readonly asForceUnreserve: {
      readonly who: MultiAddress;
      readonly amount: u128;
    } & Struct;
    readonly type: 'Transfer' | 'SetBalance' | 'ForceTransfer' | 'TransferKeepAlive' | 'TransferAll' | 'ForceUnreserve';
  }

  /** @name PalletBalancesError (107) */
  export interface PalletBalancesError extends Enum {
    readonly isVestingBalance: boolean;
    readonly isLiquidityRestrictions: boolean;
    readonly isInsufficientBalance: boolean;
    readonly isExistentialDeposit: boolean;
    readonly isKeepAlive: boolean;
    readonly isExistingVestingSchedule: boolean;
    readonly isDeadAccount: boolean;
    readonly isTooManyReserves: boolean;
    readonly type: 'VestingBalance' | 'LiquidityRestrictions' | 'InsufficientBalance' | 'ExistentialDeposit' | 'KeepAlive' | 'ExistingVestingSchedule' | 'DeadAccount' | 'TooManyReserves';
  }

  /** @name PalletTransactionPaymentReleases (109) */
  export interface PalletTransactionPaymentReleases extends Enum {
    readonly isV1Ancient: boolean;
    readonly isV2: boolean;
    readonly type: 'V1Ancient' | 'V2';
  }

  /** @name FrameSupportWeightsWeightToFeeCoefficient (111) */
  export interface FrameSupportWeightsWeightToFeeCoefficient extends Struct {
    readonly coeffInteger: u128;
    readonly coeffFrac: Perbill;
    readonly negative: bool;
    readonly degree: u8;
  }

  /** @name PalletSudoCall (112) */
  export interface PalletSudoCall extends Enum {
    readonly isSudo: boolean;
    readonly asSudo: {
      readonly call: Call;
    } & Struct;
    readonly isSudoUncheckedWeight: boolean;
    readonly asSudoUncheckedWeight: {
      readonly call: Call;
      readonly weight: u64;
    } & Struct;
    readonly isSetKey: boolean;
    readonly asSetKey: {
      readonly new_: MultiAddress;
    } & Struct;
    readonly isSudoAs: boolean;
    readonly asSudoAs: {
      readonly who: MultiAddress;
      readonly call: Call;
    } & Struct;
    readonly type: 'Sudo' | 'SudoUncheckedWeight' | 'SetKey' | 'SudoAs';
  }

  /** @name PalletTemplateCall (114) */
  export interface PalletTemplateCall extends Enum {
    readonly isDoSomething: boolean;
    readonly asDoSomething: {
      readonly something: u32;
    } & Struct;
    readonly isCauseError: boolean;
    readonly type: 'DoSomething' | 'CauseError';
  }

  /** @name PalletTaskCall (115) */
  export interface PalletTaskCall extends Enum {
    readonly isCreateTask: boolean;
    readonly asCreateTask: {
      readonly title: Bytes;
      readonly specification: Bytes;
      readonly budget: u128;
      readonly deadline: u32;
    } & Struct;
    readonly isStartTask: boolean;
    readonly asStartTask: {
      readonly taskId: H256;
    } & Struct;
    readonly isCompleteTask: boolean;
    readonly asCompleteTask: {
      readonly taskId: H256;
    } & Struct;
    readonly isRemoveTask: boolean;
    readonly asRemoveTask: {
      readonly taskId: H256;
    } & Struct;
    readonly type: 'CreateTask' | 'StartTask' | 'CompleteTask' | 'RemoveTask';
  }

  /** @name PalletProfileCall (116) */
  export interface PalletProfileCall extends Enum {
    readonly isCreateProfile: boolean;
    readonly asCreateProfile: {
      readonly username: Bytes;
      readonly interests: Bytes;
    } & Struct;
    readonly isUpdateProfile: boolean;
    readonly asUpdateProfile: {
      readonly username: Bytes;
      readonly interests: Bytes;
    } & Struct;
    readonly isRemoveProfile: boolean;
    readonly type: 'CreateProfile' | 'UpdateProfile' | 'RemoveProfile';
  }

  /** @name PalletDaoCall (117) */
  export interface PalletDaoCall extends Enum {
    readonly isCreateVision: boolean;
    readonly asCreateVision: {
      readonly visionDocument: Bytes;
    } & Struct;
    readonly isRemoveVision: boolean;
    readonly asRemoveVision: {
      readonly visionDocument: Bytes;
    } & Struct;
    readonly isSignVision: boolean;
    readonly asSignVision: {
      readonly visionDocument: Bytes;
    } & Struct;
    readonly isUnsignVision: boolean;
    readonly asUnsignVision: {
      readonly visionDocument: Bytes;
    } & Struct;
    readonly isCreateOrganization: boolean;
    readonly asCreateOrganization: {
      readonly orgName: Bytes;
    } & Struct;
    readonly isAddMembers: boolean;
    readonly asAddMembers: {
      readonly orgName: Bytes;
      readonly account: AccountId32;
    } & Struct;
    readonly isAddTasks: boolean;
    readonly asAddTasks: {
      readonly orgName: Bytes;
      readonly task: H256;
    } & Struct;
    readonly isRemoveMembers: boolean;
    readonly asRemoveMembers: {
      readonly orgName: Bytes;
      readonly account: AccountId32;
    } & Struct;
    readonly isRemoveTasks: boolean;
    readonly asRemoveTasks: {
      readonly orgName: Bytes;
      readonly task: H256;
    } & Struct;
    readonly isDissolveOrganization: boolean;
    readonly asDissolveOrganization: {
      readonly orgName: Bytes;
    } & Struct;
    readonly type: 'CreateVision' | 'RemoveVision' | 'SignVision' | 'UnsignVision' | 'CreateOrganization' | 'AddMembers' | 'AddTasks' | 'RemoveMembers' | 'RemoveTasks' | 'DissolveOrganization';
  }

  /** @name PalletSudoError (118) */
  export interface PalletSudoError extends Enum {
    readonly isRequireSudo: boolean;
    readonly type: 'RequireSudo';
  }

  /** @name PalletTemplateError (119) */
  export interface PalletTemplateError extends Enum {
    readonly isNoneValue: boolean;
    readonly isStorageOverflow: boolean;
    readonly type: 'NoneValue' | 'StorageOverflow';
  }

  /** @name PalletTaskTask (120) */
  export interface PalletTaskTask extends Struct {
    readonly title: Bytes;
    readonly specification: Bytes;
    readonly initiator: AccountId32;
    readonly volunteer: AccountId32;
    readonly currentOwner: AccountId32;
    readonly status: PalletTaskTaskStatus;
    readonly budget: u128;
    readonly deadline: u32;
  }

  /** @name PalletTaskTaskStatus (121) */
  export interface PalletTaskTaskStatus extends Enum {
    readonly isCreated: boolean;
    readonly isInProgress: boolean;
    readonly isClosed: boolean;
    readonly type: 'Created' | 'InProgress' | 'Closed';
  }

  /** @name PalletTaskError (123) */
  export interface PalletTaskError extends Enum {
    readonly isTaskCountOverflow: boolean;
    readonly isTaskNotExist: boolean;
    readonly isOnlyInitiatorClosesTask: boolean;
    readonly isNotEnoughBalance: boolean;
    readonly isExceedMaxTasksOwned: boolean;
    readonly isNoPermissionToComplete: boolean;
    readonly isNoProfile: boolean;
    readonly type: 'TaskCountOverflow' | 'TaskNotExist' | 'OnlyInitiatorClosesTask' | 'NotEnoughBalance' | 'ExceedMaxTasksOwned' | 'NoPermissionToComplete' | 'NoProfile';
  }

  /** @name PalletProfileProfile (124) */
  export interface PalletProfileProfile extends Struct {
    readonly owner: AccountId32;
    readonly name: Bytes;
    readonly interests: Bytes;
    readonly balance: Option<u128>;
    readonly reputation: u32;
  }

  /** @name PalletProfileError (126) */
  export interface PalletProfileError extends Enum {
    readonly isProfileCountOverflow: boolean;
    readonly isNoUpdateAuthority: boolean;
    readonly isNoDeletionAuthority: boolean;
    readonly isProfileAlreadyCreated: boolean;
    readonly isNoProfileCreated: boolean;
    readonly type: 'ProfileCountOverflow' | 'NoUpdateAuthority' | 'NoDeletionAuthority' | 'ProfileAlreadyCreated' | 'NoProfileCreated';
  }

  /** @name PalletDaoError (129) */
  export interface PalletDaoError extends Enum {
    readonly isNoneValue: boolean;
    readonly isStorageOverflow: boolean;
    readonly isVisionAlreadyExists: boolean;
    readonly isNoSuchVision: boolean;
    readonly isNotVisionOwner: boolean;
    readonly isVisionCountOverflow: boolean;
    readonly isOrganizationCountOverflow: boolean;
    readonly isAlreadySigned: boolean;
    readonly isNotSigned: boolean;
    readonly isNotOrganizationCreator: boolean;
    readonly isAlreadyMember: boolean;
    readonly isInvalidOrganization: boolean;
    readonly isNotMember: boolean;
    readonly isTaskNotExist: boolean;
    readonly isTaskAlreadyExists: boolean;
    readonly type: 'NoneValue' | 'StorageOverflow' | 'VisionAlreadyExists' | 'NoSuchVision' | 'NotVisionOwner' | 'VisionCountOverflow' | 'OrganizationCountOverflow' | 'AlreadySigned' | 'NotSigned' | 'NotOrganizationCreator' | 'AlreadyMember' | 'InvalidOrganization' | 'NotMember' | 'TaskNotExist' | 'TaskAlreadyExists';
  }

  /** @name SpRuntimeMultiSignature (131) */
  export interface SpRuntimeMultiSignature extends Enum {
    readonly isEd25519: boolean;
    readonly asEd25519: SpCoreEd25519Signature;
    readonly isSr25519: boolean;
    readonly asSr25519: SpCoreSr25519Signature;
    readonly isEcdsa: boolean;
    readonly asEcdsa: SpCoreEcdsaSignature;
    readonly type: 'Ed25519' | 'Sr25519' | 'Ecdsa';
  }

  /** @name SpCoreSr25519Signature (132) */
  export interface SpCoreSr25519Signature extends U8aFixed {}

  /** @name SpCoreEcdsaSignature (133) */
  export interface SpCoreEcdsaSignature extends U8aFixed {}

  /** @name FrameSystemExtensionsCheckSpecVersion (136) */
  export type FrameSystemExtensionsCheckSpecVersion = Null;

  /** @name FrameSystemExtensionsCheckTxVersion (137) */
  export type FrameSystemExtensionsCheckTxVersion = Null;

  /** @name FrameSystemExtensionsCheckGenesis (138) */
  export type FrameSystemExtensionsCheckGenesis = Null;

  /** @name FrameSystemExtensionsCheckNonce (141) */
  export interface FrameSystemExtensionsCheckNonce extends Compact<u32> {}

  /** @name FrameSystemExtensionsCheckWeight (142) */
  export type FrameSystemExtensionsCheckWeight = Null;

  /** @name PalletTransactionPaymentChargeTransactionPayment (143) */
  export interface PalletTransactionPaymentChargeTransactionPayment extends Compact<u128> {}

  /** @name NodeTemplateRuntimeRuntime (144) */
  export type NodeTemplateRuntimeRuntime = Null;

} // declare module
