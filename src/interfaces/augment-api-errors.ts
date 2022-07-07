// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { ApiTypes, AugmentedError } from '@polkadot/api-base/types';

export type __AugmentedError<ApiType extends ApiTypes> = AugmentedError<ApiType>;

declare module '@polkadot/api-base/types/errors' {
  export interface AugmentedErrors<ApiType extends ApiTypes> {
    balances: {
      /**
       * Beneficiary account must pre-exist
       **/
      DeadAccount: AugmentedError<ApiType>;
      /**
       * Value too low to create account due to existential deposit
       **/
      ExistentialDeposit: AugmentedError<ApiType>;
      /**
       * A vesting schedule already exists for this account
       **/
      ExistingVestingSchedule: AugmentedError<ApiType>;
      /**
       * Balance too low to send value
       **/
      InsufficientBalance: AugmentedError<ApiType>;
      /**
       * Transfer/payment would kill account
       **/
      KeepAlive: AugmentedError<ApiType>;
      /**
       * Account liquidity restrictions prevent withdrawal
       **/
      LiquidityRestrictions: AugmentedError<ApiType>;
      /**
       * Number of named reserves exceed MaxReserves
       **/
      TooManyReserves: AugmentedError<ApiType>;
      /**
       * Vesting balance too high to send value
       **/
      VestingBalance: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    dao: {
      /**
       * User is already a member of this DAO.
       **/
      AlreadyMember: AugmentedError<ApiType>;
      /**
       * This vision has already been signed
       **/
      AlreadySigned: AugmentedError<ApiType>;
      /**
       * The organization doesn't exist.
       **/
      InvalidOrganization: AugmentedError<ApiType>;
      /**
       * Error names should be descriptive.
       **/
      NoneValue: AugmentedError<ApiType>;
      /**
       * The Vision doesn't exist
       **/
      NoSuchVision: AugmentedError<ApiType>;
      /**
       * The user is not a member of this organization.
       **/
      NotMember: AugmentedError<ApiType>;
      /**
       * No rights to remove. Only creator can remove an organization
       **/
      NotOrganizationCreator: AugmentedError<ApiType>;
      /**
       * You can't unsign from vision that that you haven't signed.
       **/
      NotSigned: AugmentedError<ApiType>;
      /**
       * You are not the owner of the vision.
       **/
      NotVisionOwner: AugmentedError<ApiType>;
      /**
       * Max limit for Organizations reached
       **/
      OrganizationCountOverflow: AugmentedError<ApiType>;
      /**
       * Errors should have helpful documentation associated with them.
       **/
      StorageOverflow: AugmentedError<ApiType>;
      /**
       * Task has been already added to organization.
       **/
      TaskAlreadyExists: AugmentedError<ApiType>;
      /**
       * Task doesn't exist
       **/
      TaskNotExist: AugmentedError<ApiType>;
      /**
       * The vision has already been created.
       **/
      VisionAlreadyExists: AugmentedError<ApiType>;
      /**
       * Max limit for Visions reached
       **/
      VisionCountOverflow: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    grandpa: {
      /**
       * Attempt to signal GRANDPA change with one already pending.
       **/
      ChangePending: AugmentedError<ApiType>;
      /**
       * A given equivocation report is valid but already previously reported.
       **/
      DuplicateOffenceReport: AugmentedError<ApiType>;
      /**
       * An equivocation proof provided as part of an equivocation report is invalid.
       **/
      InvalidEquivocationProof: AugmentedError<ApiType>;
      /**
       * A key ownership proof provided as part of an equivocation report is invalid.
       **/
      InvalidKeyOwnershipProof: AugmentedError<ApiType>;
      /**
       * Attempt to signal GRANDPA pause when the authority set isn't live
       * (either paused or already pending pause).
       **/
      PauseFailed: AugmentedError<ApiType>;
      /**
       * Attempt to signal GRANDPA resume when the authority set isn't paused
       * (either live or already pending resume).
       **/
      ResumeFailed: AugmentedError<ApiType>;
      /**
       * Cannot signal forced change so soon after last.
       **/
      TooSoon: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    profile: {
      /**
       * Profiles can only be deleted by the creator
       **/
      NoDeletionAuthority: AugmentedError<ApiType>;
      /**
       * This Account has not yet created a profile.
       **/
      NoProfileCreated: AugmentedError<ApiType>;
      /**
       * No permission to update this profile.
       **/
      NoUpdateAuthority: AugmentedError<ApiType>;
      /**
       * One Account can only create a single profile.
       **/
      ProfileAlreadyCreated: AugmentedError<ApiType>;
      /**
       * Reached maximum number of profiles.
       **/
      ProfileCountOverflow: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    sudo: {
      /**
       * Sender must be the Sudo account
       **/
      RequireSudo: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    system: {
      /**
       * Failed to extract the runtime version from the new runtime.
       * 
       * Either calling `Core_version` or decoding `RuntimeVersion` failed.
       **/
      FailedToExtractRuntimeVersion: AugmentedError<ApiType>;
      /**
       * The name of specification does not match between the current runtime
       * and the new runtime.
       **/
      InvalidSpecName: AugmentedError<ApiType>;
      /**
       * Suicide called when the account has non-default composite data.
       **/
      NonDefaultComposite: AugmentedError<ApiType>;
      /**
       * There is a non-zero reference count preventing the account from being purged.
       **/
      NonZeroRefCount: AugmentedError<ApiType>;
      /**
       * The specification version is not allowed to decrease between the current runtime
       * and the new runtime.
       **/
      SpecVersionNeedsToIncrease: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    task: {
      /**
       * Exceed maximum tasks owned
       **/
      ExceedMaxTasksOwned: AugmentedError<ApiType>;
      /**
       * You are not allowed to complete this task
       **/
      NoPermissionToComplete: AugmentedError<ApiType>;
      /**
       * This account has no Profile yet.
       **/
      NoProfile: AugmentedError<ApiType>;
      /**
       * Not enough balance to pay
       **/
      NotEnoughBalance: AugmentedError<ApiType>;
      /**
       * Only the initiator of task has the rights to remove task
       **/
      OnlyInitiatorClosesTask: AugmentedError<ApiType>;
      /**
       * Reached maximum number of tasks.
       **/
      TaskCountOverflow: AugmentedError<ApiType>;
      /**
       * The given task doesn't exists. Try again
       **/
      TaskNotExist: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    templateModule: {
      /**
       * Error names should be descriptive.
       **/
      NoneValue: AugmentedError<ApiType>;
      /**
       * Errors should have helpful documentation associated with them.
       **/
      StorageOverflow: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
  } // AugmentedErrors
} // declare module
