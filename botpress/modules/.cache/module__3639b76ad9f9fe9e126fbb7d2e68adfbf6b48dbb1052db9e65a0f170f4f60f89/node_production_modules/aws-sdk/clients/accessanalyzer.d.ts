import {Request} from '../lib/request';
import {Response} from '../lib/response';
import {AWSError} from '../lib/error';
import {Service} from '../lib/service';
import {ServiceConfigurationOptions} from '../lib/service';
import {ConfigBase as Config} from '../lib/config';
interface Blob {}
declare class AccessAnalyzer extends Service {
  /**
   * Constructs a service object. This object has one method for each API operation.
   */
  constructor(options?: AccessAnalyzer.Types.ClientConfiguration)
  config: Config & AccessAnalyzer.Types.ClientConfiguration;
  /**
   * Creates an analyzer for your account.
   */
  createAnalyzer(params: AccessAnalyzer.Types.CreateAnalyzerRequest, callback?: (err: AWSError, data: AccessAnalyzer.Types.CreateAnalyzerResponse) => void): Request<AccessAnalyzer.Types.CreateAnalyzerResponse, AWSError>;
  /**
   * Creates an analyzer for your account.
   */
  createAnalyzer(callback?: (err: AWSError, data: AccessAnalyzer.Types.CreateAnalyzerResponse) => void): Request<AccessAnalyzer.Types.CreateAnalyzerResponse, AWSError>;
  /**
   * Creates an archive rule for the specified analyzer. Archive rules automatically archive findings that meet the criteria you define when you create the rule.
   */
  createArchiveRule(params: AccessAnalyzer.Types.CreateArchiveRuleRequest, callback?: (err: AWSError, data: {}) => void): Request<{}, AWSError>;
  /**
   * Creates an archive rule for the specified analyzer. Archive rules automatically archive findings that meet the criteria you define when you create the rule.
   */
  createArchiveRule(callback?: (err: AWSError, data: {}) => void): Request<{}, AWSError>;
  /**
   * Deletes the specified analyzer. When you delete an analyzer, Access Analyzer is disabled for the account in the current or specific Region. All findings that were generated by the analyzer are deleted. You cannot undo this action.
   */
  deleteAnalyzer(params: AccessAnalyzer.Types.DeleteAnalyzerRequest, callback?: (err: AWSError, data: {}) => void): Request<{}, AWSError>;
  /**
   * Deletes the specified analyzer. When you delete an analyzer, Access Analyzer is disabled for the account in the current or specific Region. All findings that were generated by the analyzer are deleted. You cannot undo this action.
   */
  deleteAnalyzer(callback?: (err: AWSError, data: {}) => void): Request<{}, AWSError>;
  /**
   * Deletes the specified archive rule.
   */
  deleteArchiveRule(params: AccessAnalyzer.Types.DeleteArchiveRuleRequest, callback?: (err: AWSError, data: {}) => void): Request<{}, AWSError>;
  /**
   * Deletes the specified archive rule.
   */
  deleteArchiveRule(callback?: (err: AWSError, data: {}) => void): Request<{}, AWSError>;
  /**
   * Retrieves information about a resource that was analyzed.
   */
  getAnalyzedResource(params: AccessAnalyzer.Types.GetAnalyzedResourceRequest, callback?: (err: AWSError, data: AccessAnalyzer.Types.GetAnalyzedResourceResponse) => void): Request<AccessAnalyzer.Types.GetAnalyzedResourceResponse, AWSError>;
  /**
   * Retrieves information about a resource that was analyzed.
   */
  getAnalyzedResource(callback?: (err: AWSError, data: AccessAnalyzer.Types.GetAnalyzedResourceResponse) => void): Request<AccessAnalyzer.Types.GetAnalyzedResourceResponse, AWSError>;
  /**
   * Retrieves information about the specified analyzer.
   */
  getAnalyzer(params: AccessAnalyzer.Types.GetAnalyzerRequest, callback?: (err: AWSError, data: AccessAnalyzer.Types.GetAnalyzerResponse) => void): Request<AccessAnalyzer.Types.GetAnalyzerResponse, AWSError>;
  /**
   * Retrieves information about the specified analyzer.
   */
  getAnalyzer(callback?: (err: AWSError, data: AccessAnalyzer.Types.GetAnalyzerResponse) => void): Request<AccessAnalyzer.Types.GetAnalyzerResponse, AWSError>;
  /**
   * Retrieves information about an archive rule.
   */
  getArchiveRule(params: AccessAnalyzer.Types.GetArchiveRuleRequest, callback?: (err: AWSError, data: AccessAnalyzer.Types.GetArchiveRuleResponse) => void): Request<AccessAnalyzer.Types.GetArchiveRuleResponse, AWSError>;
  /**
   * Retrieves information about an archive rule.
   */
  getArchiveRule(callback?: (err: AWSError, data: AccessAnalyzer.Types.GetArchiveRuleResponse) => void): Request<AccessAnalyzer.Types.GetArchiveRuleResponse, AWSError>;
  /**
   * Retrieves information about the specified finding.
   */
  getFinding(params: AccessAnalyzer.Types.GetFindingRequest, callback?: (err: AWSError, data: AccessAnalyzer.Types.GetFindingResponse) => void): Request<AccessAnalyzer.Types.GetFindingResponse, AWSError>;
  /**
   * Retrieves information about the specified finding.
   */
  getFinding(callback?: (err: AWSError, data: AccessAnalyzer.Types.GetFindingResponse) => void): Request<AccessAnalyzer.Types.GetFindingResponse, AWSError>;
  /**
   * Retrieves a list of resources of the specified type that have been analyzed by the specified analyzer..
   */
  listAnalyzedResources(params: AccessAnalyzer.Types.ListAnalyzedResourcesRequest, callback?: (err: AWSError, data: AccessAnalyzer.Types.ListAnalyzedResourcesResponse) => void): Request<AccessAnalyzer.Types.ListAnalyzedResourcesResponse, AWSError>;
  /**
   * Retrieves a list of resources of the specified type that have been analyzed by the specified analyzer..
   */
  listAnalyzedResources(callback?: (err: AWSError, data: AccessAnalyzer.Types.ListAnalyzedResourcesResponse) => void): Request<AccessAnalyzer.Types.ListAnalyzedResourcesResponse, AWSError>;
  /**
   * Retrieves a list of analyzers.
   */
  listAnalyzers(params: AccessAnalyzer.Types.ListAnalyzersRequest, callback?: (err: AWSError, data: AccessAnalyzer.Types.ListAnalyzersResponse) => void): Request<AccessAnalyzer.Types.ListAnalyzersResponse, AWSError>;
  /**
   * Retrieves a list of analyzers.
   */
  listAnalyzers(callback?: (err: AWSError, data: AccessAnalyzer.Types.ListAnalyzersResponse) => void): Request<AccessAnalyzer.Types.ListAnalyzersResponse, AWSError>;
  /**
   * Retrieves a list of archive rules created for the specified analyzer.
   */
  listArchiveRules(params: AccessAnalyzer.Types.ListArchiveRulesRequest, callback?: (err: AWSError, data: AccessAnalyzer.Types.ListArchiveRulesResponse) => void): Request<AccessAnalyzer.Types.ListArchiveRulesResponse, AWSError>;
  /**
   * Retrieves a list of archive rules created for the specified analyzer.
   */
  listArchiveRules(callback?: (err: AWSError, data: AccessAnalyzer.Types.ListArchiveRulesResponse) => void): Request<AccessAnalyzer.Types.ListArchiveRulesResponse, AWSError>;
  /**
   * Retrieves a list of findings generated by the specified analyzer.
   */
  listFindings(params: AccessAnalyzer.Types.ListFindingsRequest, callback?: (err: AWSError, data: AccessAnalyzer.Types.ListFindingsResponse) => void): Request<AccessAnalyzer.Types.ListFindingsResponse, AWSError>;
  /**
   * Retrieves a list of findings generated by the specified analyzer.
   */
  listFindings(callback?: (err: AWSError, data: AccessAnalyzer.Types.ListFindingsResponse) => void): Request<AccessAnalyzer.Types.ListFindingsResponse, AWSError>;
  /**
   * Retrieves a list of tags applied to the specified resource.
   */
  listTagsForResource(params: AccessAnalyzer.Types.ListTagsForResourceRequest, callback?: (err: AWSError, data: AccessAnalyzer.Types.ListTagsForResourceResponse) => void): Request<AccessAnalyzer.Types.ListTagsForResourceResponse, AWSError>;
  /**
   * Retrieves a list of tags applied to the specified resource.
   */
  listTagsForResource(callback?: (err: AWSError, data: AccessAnalyzer.Types.ListTagsForResourceResponse) => void): Request<AccessAnalyzer.Types.ListTagsForResourceResponse, AWSError>;
  /**
   * Immediately starts a scan of the policies applied to the specified resource.
   */
  startResourceScan(params: AccessAnalyzer.Types.StartResourceScanRequest, callback?: (err: AWSError, data: {}) => void): Request<{}, AWSError>;
  /**
   * Immediately starts a scan of the policies applied to the specified resource.
   */
  startResourceScan(callback?: (err: AWSError, data: {}) => void): Request<{}, AWSError>;
  /**
   * Adds a tag to the specified resource.
   */
  tagResource(params: AccessAnalyzer.Types.TagResourceRequest, callback?: (err: AWSError, data: AccessAnalyzer.Types.TagResourceResponse) => void): Request<AccessAnalyzer.Types.TagResourceResponse, AWSError>;
  /**
   * Adds a tag to the specified resource.
   */
  tagResource(callback?: (err: AWSError, data: AccessAnalyzer.Types.TagResourceResponse) => void): Request<AccessAnalyzer.Types.TagResourceResponse, AWSError>;
  /**
   * Removes a tag from the specified resource.
   */
  untagResource(params: AccessAnalyzer.Types.UntagResourceRequest, callback?: (err: AWSError, data: AccessAnalyzer.Types.UntagResourceResponse) => void): Request<AccessAnalyzer.Types.UntagResourceResponse, AWSError>;
  /**
   * Removes a tag from the specified resource.
   */
  untagResource(callback?: (err: AWSError, data: AccessAnalyzer.Types.UntagResourceResponse) => void): Request<AccessAnalyzer.Types.UntagResourceResponse, AWSError>;
  /**
   * Updates the criteria and values for the specified archive rule.
   */
  updateArchiveRule(params: AccessAnalyzer.Types.UpdateArchiveRuleRequest, callback?: (err: AWSError, data: {}) => void): Request<{}, AWSError>;
  /**
   * Updates the criteria and values for the specified archive rule.
   */
  updateArchiveRule(callback?: (err: AWSError, data: {}) => void): Request<{}, AWSError>;
  /**
   * Updates the status for the specified findings.
   */
  updateFindings(params: AccessAnalyzer.Types.UpdateFindingsRequest, callback?: (err: AWSError, data: {}) => void): Request<{}, AWSError>;
  /**
   * Updates the status for the specified findings.
   */
  updateFindings(callback?: (err: AWSError, data: {}) => void): Request<{}, AWSError>;
}
declare namespace AccessAnalyzer {
  export type ActionList = String[];
  export interface AnalyzedResource {
    /**
     * The actions that an external principal is granted permission to use by the policy that generated the finding.
     */
    actions?: ActionList;
    /**
     * The time at which the resource was analyzed.
     */
    analyzedAt: Timestamp;
    /**
     * The time at which the finding was created.
     */
    createdAt: Timestamp;
    /**
     * An error message.
     */
    error?: String;
    /**
     * Indicates whether the policy that generated the finding grants public access to the resource.
     */
    isPublic: Boolean;
    /**
     * The ARN of the resource that was analyzed.
     */
    resourceArn: ResourceArn;
    /**
     * The AWS account ID that owns the resource.
     */
    resourceOwnerAccount: String;
    /**
     * The type of the resource that was analyzed.
     */
    resourceType: ResourceType;
    /**
     * Indicates how the access that generated the finding is granted.
     */
    sharedVia?: SharedViaList;
    /**
     * The current status of the finding generated from the analyzed resource.
     */
    status?: FindingStatus;
    /**
     * The time at which the finding was updated.
     */
    updatedAt: Timestamp;
  }
  export interface AnalyzedResourceSummary {
    /**
     * The ARN of the analyzed resource.
     */
    resourceArn: ResourceArn;
    /**
     * The AWS account ID that owns the resource.
     */
    resourceOwnerAccount: String;
    /**
     * The type of resource that was analyzed.
     */
    resourceType: ResourceType;
  }
  export type AnalyzedResourcesList = AnalyzedResourceSummary[];
  export type AnalyzerArn = string;
  export type AnalyzerStatus = "ACTIVE"|"CREATING"|"DISABLED"|"FAILED"|string;
  export interface AnalyzerSummary {
    /**
     * The ARN of the analyzer.
     */
    arn: AnalyzerArn;
    /**
     * A timestamp for the time at which the analyzer was created.
     */
    createdAt: Timestamp;
    /**
     * The resource that was most recently analyzed by the analyzer.
     */
    lastResourceAnalyzed?: String;
    /**
     * The time at which the most recently analyzed resource was analyzed.
     */
    lastResourceAnalyzedAt?: Timestamp;
    /**
     * The name of the analyzer.
     */
    name: Name;
    /**
     * The status of the analyzer. An Active analyzer successfully monitors supported resources and generates new findings. The analyzer is Disabled when a user action, such as removing trusted access for IAM Access Analyzer from AWS Organizations, causes the analyzer to stop generating new findings. The status is Creating when the analyzer creation is in progress and Failed when the analyzer creation has failed. 
     */
    status: AnalyzerStatus;
    /**
     * The statusReason provides more details about the current status of the analyzer. For example, if the creation for the analyzer fails, a Failed status is displayed. For an analyzer with organization as the type, this failure can be due to an issue with creating the service-linked roles required in the member accounts of the AWS organization.
     */
    statusReason?: StatusReason;
    /**
     * The tags added to the analyzer.
     */
    tags?: TagsMap;
    /**
     * The type of analyzer, which corresponds to the zone of trust chosen for the analyzer.
     */
    type: Type;
  }
  export type AnalyzersList = AnalyzerSummary[];
  export interface ArchiveRuleSummary {
    /**
     * The time at which the archive rule was created.
     */
    createdAt: Timestamp;
    /**
     * A filter used to define the archive rule.
     */
    filter: FilterCriteriaMap;
    /**
     * The name of the archive rule.
     */
    ruleName: Name;
    /**
     * The time at which the archive rule was last updated.
     */
    updatedAt: Timestamp;
  }
  export type ArchiveRulesList = ArchiveRuleSummary[];
  export type Boolean = boolean;
  export type ConditionKeyMap = {[key: string]: String};
  export interface CreateAnalyzerRequest {
    /**
     * The name of the analyzer to create.
     */
    analyzerName: Name;
    /**
     * Specifies the archive rules to add for the analyzer. Archive rules automatically archive findings that meet the criteria you define for the rule.
     */
    archiveRules?: InlineArchiveRulesList;
    /**
     * A client token.
     */
    clientToken?: String;
    /**
     * The tags to apply to the analyzer.
     */
    tags?: TagsMap;
    /**
     * The type of analyzer to create. Only ACCOUNT analyzers are supported. You can create only one analyzer per account per Region.
     */
    type: Type;
  }
  export interface CreateAnalyzerResponse {
    /**
     * The ARN of the analyzer that was created by the request.
     */
    arn?: AnalyzerArn;
  }
  export interface CreateArchiveRuleRequest {
    /**
     * The name of the created analyzer.
     */
    analyzerName: Name;
    /**
     * A client token.
     */
    clientToken?: String;
    /**
     * The criteria for the rule.
     */
    filter: FilterCriteriaMap;
    /**
     * The name of the rule to create.
     */
    ruleName: Name;
  }
  export interface Criterion {
    /**
     * A "contains" operator to match for the filter used to create the rule.
     */
    contains?: ValueList;
    /**
     * An "equals" operator to match for the filter used to create the rule.
     */
    eq?: ValueList;
    /**
     * An "exists" operator to match for the filter used to create the rule. 
     */
    exists?: Boolean;
    /**
     * A "not equals" operator to match for the filter used to create the rule.
     */
    neq?: ValueList;
  }
  export interface DeleteAnalyzerRequest {
    /**
     * The name of the analyzer to delete.
     */
    analyzerName: Name;
    /**
     * A client token.
     */
    clientToken?: String;
  }
  export interface DeleteArchiveRuleRequest {
    /**
     * The name of the analyzer that associated with the archive rule to delete.
     */
    analyzerName: Name;
    /**
     * A client token.
     */
    clientToken?: String;
    /**
     * The name of the rule to delete.
     */
    ruleName: Name;
  }
  export type FilterCriteriaMap = {[key: string]: Criterion};
  export interface Finding {
    /**
     * The action in the analyzed policy statement that an external principal has permission to use.
     */
    action?: ActionList;
    /**
     * The time at which the resource was analyzed.
     */
    analyzedAt: Timestamp;
    /**
     * The condition in the analyzed policy statement that resulted in a finding.
     */
    condition: ConditionKeyMap;
    /**
     * The time at which the finding was generated.
     */
    createdAt: Timestamp;
    /**
     * An error.
     */
    error?: String;
    /**
     * The ID of the finding.
     */
    id: FindingId;
    /**
     * Indicates whether the policy that generated the finding allows public access to the resource.
     */
    isPublic?: Boolean;
    /**
     * The external principal that access to a resource within the zone of trust.
     */
    principal?: PrincipalMap;
    /**
     * The resource that an external principal has access to.
     */
    resource?: String;
    /**
     * The AWS account ID that owns the resource.
     */
    resourceOwnerAccount: String;
    /**
     * The type of the resource reported in the finding.
     */
    resourceType: ResourceType;
    /**
     * The current status of the finding.
     */
    status: FindingStatus;
    /**
     * The time at which the finding was updated.
     */
    updatedAt: Timestamp;
  }
  export type FindingId = string;
  export type FindingIdList = FindingId[];
  export type FindingStatus = "ACTIVE"|"ARCHIVED"|"RESOLVED"|string;
  export type FindingStatusUpdate = "ACTIVE"|"ARCHIVED"|string;
  export interface FindingSummary {
    /**
     * The action in the analyzed policy statement that an external principal has permission to use.
     */
    action?: ActionList;
    /**
     * The time at which the resource-based policy that generated the finding was analyzed.
     */
    analyzedAt: Timestamp;
    /**
     * The condition in the analyzed policy statement that resulted in a finding.
     */
    condition: ConditionKeyMap;
    /**
     * The time at which the finding was created.
     */
    createdAt: Timestamp;
    /**
     * The error that resulted in an Error finding.
     */
    error?: String;
    /**
     * The ID of the finding.
     */
    id: FindingId;
    /**
     * Indicates whether the finding reports a resource that has a policy that allows public access.
     */
    isPublic?: Boolean;
    /**
     * The external principal that has access to a resource within the zone of trust.
     */
    principal?: PrincipalMap;
    /**
     * The resource that the external principal has access to.
     */
    resource?: String;
    /**
     * The AWS account ID that owns the resource.
     */
    resourceOwnerAccount: String;
    /**
     * The type of the resource that the external principal has access to.
     */
    resourceType: ResourceType;
    /**
     * The status of the finding.
     */
    status: FindingStatus;
    /**
     * The time at which the finding was most recently updated.
     */
    updatedAt: Timestamp;
  }
  export type FindingsList = FindingSummary[];
  export interface GetAnalyzedResourceRequest {
    /**
     * The ARN of the analyzer to retrieve information from.
     */
    analyzerArn: AnalyzerArn;
    /**
     * The ARN of the resource to retrieve information about.
     */
    resourceArn: ResourceArn;
  }
  export interface GetAnalyzedResourceResponse {
    /**
     * An AnalyedResource object that contains information that Access Analyzer found when it analyzed the resource.
     */
    resource?: AnalyzedResource;
  }
  export interface GetAnalyzerRequest {
    /**
     * The name of the analyzer retrieved.
     */
    analyzerName: Name;
  }
  export interface GetAnalyzerResponse {
    /**
     * An AnalyzerSummary object that contains information about the analyzer.
     */
    analyzer: AnalyzerSummary;
  }
  export interface GetArchiveRuleRequest {
    /**
     * The name of the analyzer to retrieve rules from.
     */
    analyzerName: Name;
    /**
     * The name of the rule to retrieve.
     */
    ruleName: Name;
  }
  export interface GetArchiveRuleResponse {
    archiveRule: ArchiveRuleSummary;
  }
  export interface GetFindingRequest {
    /**
     * The ARN of the analyzer that generated the finding.
     */
    analyzerArn: AnalyzerArn;
    /**
     * The ID of the finding to retrieve.
     */
    id: FindingId;
  }
  export interface GetFindingResponse {
    /**
     * A finding object that contains finding details.
     */
    finding?: Finding;
  }
  export interface InlineArchiveRule {
    /**
     * The condition and values for a criterion.
     */
    filter: FilterCriteriaMap;
    /**
     * The name of the rule.
     */
    ruleName: Name;
  }
  export type InlineArchiveRulesList = InlineArchiveRule[];
  export type Integer = number;
  export interface ListAnalyzedResourcesRequest {
    /**
     * The ARN of the analyzer to retrieve a list of analyzed resources from.
     */
    analyzerArn: AnalyzerArn;
    /**
     * The maximum number of results to return in the response.
     */
    maxResults?: Integer;
    /**
     * A token used for pagination of results returned.
     */
    nextToken?: Token;
    /**
     * The type of resource.
     */
    resourceType?: ResourceType;
  }
  export interface ListAnalyzedResourcesResponse {
    /**
     * A list of resources that were analyzed.
     */
    analyzedResources: AnalyzedResourcesList;
    /**
     * A token used for pagination of results returned.
     */
    nextToken?: Token;
  }
  export interface ListAnalyzersRequest {
    /**
     * The maximum number of results to return in the response.
     */
    maxResults?: Integer;
    /**
     * A token used for pagination of results returned.
     */
    nextToken?: Token;
    /**
     * The type of analyzer.
     */
    type?: Type;
  }
  export interface ListAnalyzersResponse {
    /**
     * The analyzers retrieved.
     */
    analyzers: AnalyzersList;
    /**
     * A token used for pagination of results returned.
     */
    nextToken?: Token;
  }
  export interface ListArchiveRulesRequest {
    /**
     * The name of the analyzer to retrieve rules from.
     */
    analyzerName: Name;
    /**
     * The maximum number of results to return in the request.
     */
    maxResults?: Integer;
    /**
     * A token used for pagination of results returned.
     */
    nextToken?: Token;
  }
  export interface ListArchiveRulesResponse {
    /**
     * A list of archive rules created for the specified analyzer.
     */
    archiveRules: ArchiveRulesList;
    /**
     * A token used for pagination of results returned.
     */
    nextToken?: Token;
  }
  export interface ListFindingsRequest {
    /**
     * The ARN of the analyzer to retrieve findings from.
     */
    analyzerArn: AnalyzerArn;
    /**
     * A filter to match for the findings to return.
     */
    filter?: FilterCriteriaMap;
    /**
     * The maximum number of results to return in the response.
     */
    maxResults?: Integer;
    /**
     * A token used for pagination of results returned.
     */
    nextToken?: Token;
    /**
     * The sort order for the findings returned.
     */
    sort?: SortCriteria;
  }
  export interface ListFindingsResponse {
    /**
     * A list of findings retrieved from the analyzer that match the filter criteria specified, if any.
     */
    findings: FindingsList;
    /**
     * A token used for pagination of results returned.
     */
    nextToken?: Token;
  }
  export interface ListTagsForResourceRequest {
    /**
     * The ARN of the resource to retrieve tags from.
     */
    resourceArn: String;
  }
  export interface ListTagsForResourceResponse {
    /**
     * The tags that are applied to the specified resource.
     */
    tags?: TagsMap;
  }
  export type Name = string;
  export type OrderBy = "ASC"|"DESC"|string;
  export type PrincipalMap = {[key: string]: String};
  export type ReasonCode = "AWS_SERVICE_ACCESS_DISABLED"|"DELEGATED_ADMINISTRATOR_DEREGISTERED"|"ORGANIZATION_DELETED"|"SERVICE_LINKED_ROLE_CREATION_FAILED"|string;
  export type ResourceArn = string;
  export type ResourceType = "AWS::IAM::Role"|"AWS::KMS::Key"|"AWS::Lambda::Function"|"AWS::Lambda::LayerVersion"|"AWS::S3::Bucket"|"AWS::SQS::Queue"|string;
  export type SharedViaList = String[];
  export interface SortCriteria {
    /**
     * The name of the attribute to sort on.
     */
    attributeName?: String;
    /**
     * The sort order, ascending or descending.
     */
    orderBy?: OrderBy;
  }
  export interface StartResourceScanRequest {
    /**
     * The ARN of the analyzer to use to scan the policies applied to the specified resource.
     */
    analyzerArn: AnalyzerArn;
    /**
     * The ARN of the resource to scan.
     */
    resourceArn: ResourceArn;
  }
  export interface StatusReason {
    /**
     * The reason code for the current status of the analyzer.
     */
    code: ReasonCode;
  }
  export type String = string;
  export type TagKeys = String[];
  export interface TagResourceRequest {
    /**
     * The ARN of the resource to add the tag to.
     */
    resourceArn: String;
    /**
     * The tags to add to the resource.
     */
    tags: TagsMap;
  }
  export interface TagResourceResponse {
  }
  export type TagsMap = {[key: string]: String};
  export type Timestamp = Date;
  export type Token = string;
  export type Type = "ACCOUNT"|"ORGANIZATION"|string;
  export interface UntagResourceRequest {
    /**
     * The ARN of the resource to remove the tag from.
     */
    resourceArn: String;
    /**
     * The key for the tag to add.
     */
    tagKeys: TagKeys;
  }
  export interface UntagResourceResponse {
  }
  export interface UpdateArchiveRuleRequest {
    /**
     * The name of the analyzer to update the archive rules for.
     */
    analyzerName: Name;
    /**
     * A client token.
     */
    clientToken?: String;
    /**
     * A filter to match for the rules to update. Only rules that match the filter are updated.
     */
    filter: FilterCriteriaMap;
    /**
     * The name of the rule to update.
     */
    ruleName: Name;
  }
  export interface UpdateFindingsRequest {
    /**
     * The ARN of the analyzer that generated the findings to update.
     */
    analyzerArn: AnalyzerArn;
    /**
     * A client token.
     */
    clientToken?: String;
    /**
     * The IDs of the findings to update.
     */
    ids?: FindingIdList;
    /**
     * The ARN of the resource identified in the finding.
     */
    resourceArn?: ResourceArn;
    /**
     * The state represents the action to take to update the finding Status. Use ARCHIVE to change an Active finding to an Archived finding. Use ACTIVE to change an Archived finding to an Active finding.
     */
    status: FindingStatusUpdate;
  }
  export type ValueList = String[];
  /**
   * A string in YYYY-MM-DD format that represents the latest possible API version that can be used in this service. Specify 'latest' to use the latest possible version.
   */
  export type apiVersion = "2019-11-01"|"latest"|string;
  export interface ClientApiVersions {
    /**
     * A string in YYYY-MM-DD format that represents the latest possible API version that can be used in this service. Specify 'latest' to use the latest possible version.
     */
    apiVersion?: apiVersion;
  }
  export type ClientConfiguration = ServiceConfigurationOptions & ClientApiVersions;
  /**
   * Contains interfaces for use with the AccessAnalyzer client.
   */
  export import Types = AccessAnalyzer;
}
export = AccessAnalyzer;
